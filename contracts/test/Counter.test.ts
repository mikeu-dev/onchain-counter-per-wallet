import { expect } from "chai";
import hre from "hardhat";

describe("Counter", function () {
    // Fixture untuk deploy contract
    async function deployCounterFixture() {
        const [owner, addr1, addr2] = await hre.viem.getWalletClients();
        const counter = await hre.viem.deployContract("Counter");
        const publicClient = await hre.viem.getPublicClient();

        return { counter, owner, addr1, addr2, publicClient };
    }

    describe("Deployment", function () {
        it("Should deploy successfully", async function () {
            const { counter } = await deployCounterFixture();
            expect(counter.address).to.be.a("string");
            expect(counter.address).to.have.lengthOf(42);
        });
    });

    describe("Initial State", function () {
        it("Should have initial counter value of 0 for any address", async function () {
            const { counter, owner, addr1 } = await deployCounterFixture();

            expect(await counter.read.getCounter([owner.account.address])).to.equal(0n);
            expect(await counter.read.getCounter([addr1.account.address])).to.equal(0n);
        });

        it("Should return 0 for getMyCounter on new address", async function () {
            const { counter } = await deployCounterFixture();
            expect(await counter.read.getMyCounter()).to.equal(0n);
        });
    });

    describe("Increment", function () {
        it("Should increment counter by 1", async function () {
            const { counter } = await deployCounterFixture();

            await counter.write.increment();
            expect(await counter.read.getMyCounter()).to.equal(1n);

            await counter.write.increment();
            expect(await counter.read.getMyCounter()).to.equal(2n);
        });

        it("Should emit CounterChanged event on increment", async function () {
            const { counter, publicClient } = await deployCounterFixture();

            const hash = await counter.write.increment();
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            // Verify event was emitted
            expect(receipt.logs.length).to.be.greaterThan(0);
        });

        it("Should maintain separate counters for different addresses", async function () {
            const { counter, owner, addr1 } = await deployCounterFixture();

            // Owner increments
            await counter.write.increment();
            await counter.write.increment();

            // Addr1 increments
            const counterAsAddr1 = await hre.viem.getContractAt(
                "Counter",
                counter.address,
                { client: { wallet: addr1 } }
            );
            await counterAsAddr1.write.increment();

            // Check counters
            expect(await counter.read.getCounter([owner.account.address])).to.equal(2n);
            expect(await counter.read.getCounter([addr1.account.address])).to.equal(1n);
        });
    });

    describe("Decrement", function () {
        it("Should decrement counter by 1", async function () {
            const { counter } = await deployCounterFixture();

            // Increment first
            await counter.write.increment();
            await counter.write.increment();
            await counter.write.increment();

            // Then decrement
            await counter.write.decrement();
            expect(await counter.read.getMyCounter()).to.equal(2n);

            await counter.write.decrement();
            expect(await counter.read.getMyCounter()).to.equal(1n);
        });

        it("Should revert when trying to decrement below zero", async function () {
            const { counter } = await deployCounterFixture();

            try {
                await counter.write.decrement();
                expect.fail("Should have thrown an error");
            } catch (error: any) {
                expect(error.message).to.include("Counter cannot go below zero");
            }
        });

        it("Should emit CounterChanged event on decrement", async function () {
            const { counter, publicClient } = await deployCounterFixture();

            await counter.write.increment();
            const hash = await counter.write.decrement();
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            expect(receipt.logs.length).to.be.greaterThan(0);
        });
    });

    describe("Reset", function () {
        it("Should reset counter to 0", async function () {
            const { counter } = await deployCounterFixture();

            // Increment counter
            await counter.write.increment();
            await counter.write.increment();
            await counter.write.increment();
            expect(await counter.read.getMyCounter()).to.equal(3n);

            // Reset
            await counter.write.reset();
            expect(await counter.read.getMyCounter()).to.equal(0n);
        });

        it("Should emit CounterChanged event on reset", async function () {
            const { counter, publicClient } = await deployCounterFixture();

            await counter.write.increment();
            const hash = await counter.write.reset();
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            expect(receipt.logs.length).to.be.greaterThan(0);
        });
    });

    describe("SetCounter", function () {
        it("Should set counter to specific value", async function () {
            const { counter } = await deployCounterFixture();

            await counter.write.setCounter([42n]);
            expect(await counter.read.getMyCounter()).to.equal(42n);

            await counter.write.setCounter([100n]);
            expect(await counter.read.getMyCounter()).to.equal(100n);
        });

        it("Should emit CounterChanged event on setCounter", async function () {
            const { counter, publicClient } = await deployCounterFixture();

            const hash = await counter.write.setCounter([50n]);
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            expect(receipt.logs.length).to.be.greaterThan(0);
        });

        it("Should not affect other addresses when setting counter", async function () {
            const { counter, owner, addr1 } = await deployCounterFixture();

            // Owner sets counter
            await counter.write.setCounter([10n]);

            // Addr1 sets counter
            const counterAsAddr1 = await hre.viem.getContractAt(
                "Counter",
                counter.address,
                { client: { wallet: addr1 } }
            );
            await counterAsAddr1.write.setCounter([20n]);

            // Check counters
            expect(await counter.read.getCounter([owner.account.address])).to.equal(10n);
            expect(await counter.read.getCounter([addr1.account.address])).to.equal(20n);
        });
    });
});
