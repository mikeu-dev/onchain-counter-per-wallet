import { http, createConfig } from 'wagmi';
import { hardhat, sepolia, polygonMumbai } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect Project ID (optional, tapi direkomendasikan untuk production)
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

// Konfigurasi chains yang didukung
export const chains = [hardhat, sepolia, polygonMumbai] as const;

// Konfigurasi Wagmi
export const config = createConfig({
    chains,
    connectors: [
        injected(), // MetaMask, Brave Wallet, dll
        ...(projectId ? [walletConnect({ projectId })] : [])
    ],
    transports: {
        [hardhat.id]: http('http://127.0.0.1:8545'),
        [sepolia.id]: http(
            `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY || 'demo'}`
        ),
        [polygonMumbai.id]: http(
            `https://polygon-mumbai.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY || 'demo'}`
        )
    }
});

// Contract addresses per chain
export const CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
    [hardhat.id]: (import.meta.env.VITE_CONTRACT_ADDRESS_HARDHAT as `0x${string}`) || '0x',
    [sepolia.id]: (import.meta.env.VITE_CONTRACT_ADDRESS_SEPOLIA as `0x${string}`) || '0x',
    [polygonMumbai.id]:
        (import.meta.env.VITE_CONTRACT_ADDRESS_MUMBAI as `0x${string}`) || '0x'
};

// Helper function untuk mendapatkan contract address berdasarkan chain ID
export function getContractAddress(chainId: number): `0x${string}` {
    const address = CONTRACT_ADDRESSES[chainId];
    if (!address || address === '0x') {
        throw new Error(`Contract address not configured for chain ID: ${chainId}`);
    }
    return address;
}
