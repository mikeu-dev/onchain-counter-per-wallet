# Onchain Counter Per Wallet

Aplikasi Web3 decentralized yang memungkinkan setiap wallet address memiliki counter pribadi yang tersimpan on-chain. User dapat menghubungkan wallet mereka dan melakukan increment, decrement, atau reset nilai counter mereka.

## 🚀 Fitur

- ✅ **Decentralized**: Counter tersimpan di blockchain dengan transparansi penuh
- ✅ **Personal**: Setiap wallet address memiliki counter independen
- ✅ **Modern UI**: Design glassmorphism dengan animasi smooth
- ✅ **Multi-Chain Support**: Support untuk Hardhat local, Sepolia, dan Polygon Mumbai
- ✅ **Wallet Integration**: Connect dengan MetaMask, WalletConnect, dan wallet lainnya

## 🛠️ Tech Stack

- **Frontend**: SvelteKit 2 + Svelte 5 (Runes)
- **Styling**: TailwindCSS v4
- **Web3**: Wagmi + Viem
- **Smart Contract**: Solidity 0.8.20
- **Development**: Hardhat

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
```

## 🔧 Development

### 1. Compile Smart Contract

```bash
pnpm compile
```

### 2. Start Local Hardhat Node

Di terminal pertama:

```bash
pnpm node
```

### 3. Deploy Contract ke Local Network

Di terminal kedua:

```bash
pnpm deploy:local
```

Copy contract address yang muncul dan paste ke `.env`:

```env
VITE_CONTRACT_ADDRESS_HARDHAT=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 4. Start Development Server

```bash
pnpm dev
```

Buka browser di `http://localhost:5173`

### 5. Connect MetaMask ke Local Network

1. Buka MetaMask
2. Add Network:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

3. Import account dari Hardhat (gunakan private key dari output `pnpm node`)

## 🌐 Deployment ke Testnet

### Sepolia Testnet

1. Dapatkan Sepolia ETH dari faucet:
   - https://sepoliafaucet.com/
   - https://www.alchemy.com/faucets/ethereum-sepolia

2. Setup environment variables:

```env
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
PRIVATE_KEY=your_wallet_private_key
```

3. Update `hardhat.config.ts` dan uncomment Sepolia network

4. Deploy:

```bash
pnpm hardhat run scripts/deploy.ts --network sepolia
```

5. Update `.env` dengan contract address:

```env
VITE_CONTRACT_ADDRESS_SEPOLIA=0x...
```

## 📝 Smart Contract

Contract `Counter.sol` memiliki fungsi-fungsi berikut:

- `increment()` - Menambah counter sebesar 1
- `decrement()` - Mengurangi counter sebesar 1 (tidak bisa < 0)
- `reset()` - Mengatur counter ke 0
- `setCounter(uint256 value)` - Mengatur counter ke nilai tertentu
- `getMyCounter()` - Membaca nilai counter Anda
- `getCounter(address user)` - Membaca nilai counter dari address tertentu

## 🎨 UI Components

### WalletConnect
Komponen untuk koneksi wallet dengan modal pemilihan provider.

### CounterDisplay
Komponen utama untuk menampilkan dan mengubah nilai counter dengan:
- Display counter value yang besar dan animated
- Buttons untuk increment, decrement, dan reset
- Loading states saat transaction pending
- Success/Error notifications
- Transaction hash link ke block explorer

## 🧪 Testing

```bash
# Test smart contract
pnpm test:contracts

# Test frontend
pnpm test:unit

# E2E tests
pnpm test:e2e
```

## 📚 Project Structure

```
├── contracts/              # Smart contracts
│   ├── Counter.sol        # Main counter contract
│   └── test/              # Contract tests
├── scripts/               # Deployment scripts
├── src/
│   ├── lib/
│   │   ├── components/    # Svelte components
│   │   ├── stores/        # State management
│   │   └── web3/          # Web3 config & ABI
│   └── routes/            # SvelteKit routes
├── hardhat.config.ts      # Hardhat configuration
└── package.json
```

## 🔐 Security Notes

- ⚠️ **JANGAN** commit file `.env` ke Git
- ⚠️ **JANGAN** gunakan private key wallet utama untuk development
- ⚠️ Gunakan wallet khusus untuk testing dengan saldo minimal
- ⚠️ Smart contract belum di-audit, gunakan untuk learning purposes

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

Jika ada pertanyaan atau issues, silakan buat issue di GitHub repository.

---

Built with ❤️ using SvelteKit, Wagmi, and Viem
