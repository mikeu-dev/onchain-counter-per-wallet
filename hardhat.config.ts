import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-viem";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-ignition";

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        hardhat: {
            type: "edr-simulated" as const,
            chainId: 31337,
        },
        localhost: {
            type: "http" as const,
            url: "http://127.0.0.1:8545",
        },
        // Uncomment dan isi dengan API key untuk deploy ke testnet
        // sepolia: {
        //   url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        // },
        // polygonMumbai: {
        //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        // },
        // baseSepolia: {
        //   url: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        // },
    },
    paths: {
        sources: "./contracts",
        tests: "./contracts/test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
};

export default config;
