import hre from "hardhat";

async function main() {
    console.log("Deploying Counter contract...");

    // Get the contract factory
    const Counter = await hre.ethers.getContractFactory("Counter");

    // Deploy the contract
    const counter = await Counter.deploy();
    await counter.waitForDeployment();

    const address = await counter.getAddress();

    console.log(`✅ Counter deployed to: ${address}`);
    console.log(`📍 Network: ${hre.network.name}`);

    // Verify initial state
    const [deployer] = await hre.ethers.getSigners();
    const initialCount = await counter.getCounter(deployer.address);
    console.log(`🔢 Initial counter for deployer: ${initialCount}`);

    console.log("\n📝 Add this to your .env file:");
    console.log(`VITE_CONTRACT_ADDRESS_HARDHAT=${address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
