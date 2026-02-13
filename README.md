# 🚀 BTC, Binance & Ethereum Token Developer Student Project

A comprehensive blockchain development project supporting Bitcoin, Binance Smart Chain, and Ethereum networks.

## 📋 Project Overview

This project includes:
- ✅ Smart contract development with Solidity
- ✅ Multi-network deployment (Ethereum, BSC, Testnet)
- ✅ Wallet configuration
- ✅ API key management
- ✅ Token creation and deployment

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your actual keys:
- Get Infura API key: https://infura.io
- Get Etherscan API key: https://etherscan.io/apis
- Get BSCScan API key: https://bscscan.com/apis
- Add your wallet private key (for deployment only, use testnet first!)

### 3. Set Up Your Wallet

Follow the instructions in `wallet-setup.md` to:
- Create wallets for Ethereum, BSC, and Bitcoin
- Get your public wallet addresses (for receiving funds)
- Export your private key for development
- Get testnet funds

## 💰 Receive Funds

To receive cryptocurrency:

1. **Get Your Wallet Address** (from MetaMask or your wallet app)
2. **Share Only Your PUBLIC Address** (never private keys!)
3. **Example addresses:**
   - Ethereum/BSC: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
   - Bitcoin: `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`

⚠️ **Security Warning:**
- ✅ DO share: Public wallet address
- ❌ NEVER share: Private key, seed phrase, .env file

## 🚀 Deploy Your Token

### On Testnet (Recommended First):
```bash
npm run deploy:testnet
```

### On BSC Mainnet:
```bash
npm run deploy:mainnet
```

### On Ethereum Testnet:
```bash
npm run deploy:eth-testnet
```

## 📝 Project Structure

```
.
├── contracts/          # Solidity smart contracts
│   └── MyToken.sol    # ERC20 token contract
├── scripts/           # Deployment scripts
│   └── deploy.js      # Main deployment script
├── .env.example       # Environment variables template
├── hardhat.config.js  # Hardhat configuration
├── wallet-setup.md    # Wallet setup guide
└── README.md          # This file
```

## 🔧 Available Commands

- `npm run compile` - Compile smart contracts
- `npm run test` - Run tests
- `npm run deploy:testnet` - Deploy to BSC testnet
- `npm run deploy:mainnet` - Deploy to BSC mainnet
- `npm run deploy:eth-testnet` - Deploy to Ethereum testnet
- `npm run verify` - Verify contract on block explorer

## 📚 Resources

### Get API Keys:
- Infura: https://infura.io
- Etherscan: https://etherscan.io/apis
- BSCScan: https://bscscan.com/apis

### Get Testnet Funds:
- Ethereum Sepolia: https://sepoliafaucet.com
- BSC Testnet: https://testnet.binance.org/faucet-smart
- Starknet Testnet: https://faucet.goerli.starknet.io

### Wallets:
- MetaMask: https://metamask.io
- ArgentX (Starknet): https://www.argent.xyz/argent-x/
- Trust Wallet: https://trustwallet.com

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Set up your wallet (see `wallet-setup.md`)
3. ✅ Configure `.env` file with your keys
4. ✅ Get testnet funds
5. ✅ Deploy to testnet first
6. ✅ Test your contract
7. ✅ Deploy to mainnet when ready

## 📧 Your Wallet Address (For Receiving Funds)

After setting up your wallet, add your public address here:
- **Ethereum/BSC Address:** [Your address here]
- **Bitcoin Address:** [Your address here]
- **Starknet Address:** [Your address here]

---

**Author:** Tatiana Martinez  
**License:** MIT