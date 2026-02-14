# Binance Token Developer Suite 🚀

Complete setup for developing, deploying, and managing cryptocurrency tokens on Ethereum, Binance Smart Chain (BSC), and Starknet.

## 📋 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Setup API Keys

**Need API keys for Starknet and Ethereum?** We've got you covered! 🔑

#### Option A: Automated Setup (Recommended)

Run the interactive setup wizard:

```bash
npm run setup
```

#### Option B: Manual Setup

1. Get your Infura API key from https://infura.io (free)
2. Copy the environment template:

```bash
cp .env.example .env
```

3. Edit `.env` and add your API keys

**📚 Detailed API Key Guides:**
- **[🔍 FIND_API_KEYS.md](./FIND_API_KEYS.md)** - Quick reference for finding your API keys
- **[📖 API_KEY_GUIDE.md](./API_KEY_GUIDE.md)** - Complete guide for obtaining and configuring API keys
- **[⚙️ SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Full setup instructions

What you need:
- **RPC URLs**: Get from Infura, Alchemy, or QuickNode  
- **Private Key**: Your wallet's private key (NEVER commit this!)
- **Wallet Address**: Your public wallet address (safe to share)

## 📁 File Structure

```
├── .env.example              # Template for environment variables
├── FIND_API_KEYS.md          # Quick guide to find your API keys
├── API_KEY_GUIDE.md          # Complete API key setup guide
├── SETUP_GUIDE.md            # Detailed setup instructions
├── setup-api-keys.js         # Interactive API key configuration
├── wallet-config.js          # Wallet configuration & management
├── deploy-token.js           # Smart contract deployment
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

## 💼 How to Receive Funds

### Step 1: Get Your Wallet Address

```bash
node -e "
const WalletManager = require('./wallet-config.js');
const manager = new WalletManager();
const wallet = manager.generateNewWallet();
console.log('Your Public Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);
console.log('Mnemonic:', wallet.mnemonic);
"
```

**⚠️ IMPORTANT**: 
- Save your **Mnemonic** in a safe place
- NEVER share your **Private Key**
- Share only your **Public Address** to receive funds

### Step 2: Add Your Address to .env

```
WALLET_ADDRESS_ETH=0xYourAddressHere
PRIVATE_KEY=your_private_key_here
```

### Step 3: Request Testnet Funds

**For Ethereum Testnet (Sepolia):**
- Faucet: https://sepolia-faucet.pk910.de/

**For BSC Testnet:**
- Faucet: https://testnet.binance.org/faucet-smart

**For Starknet Testnet:**
- Faucet: https://faucet.goerli.starknet.io/

### Step 4: Check Your Balance

```bash
npm run check:balance:eth
npm run check:balance:bsc
```

## 🔧 Configuration Files

### .env.example

Template containing:
- RPC endpoints for each blockchain
- Network configuration
- Wallet settings
- API keys for contract verification

**Before using, RENAME to .env and add your actual keys!**

### wallet-config.js

Methods available:
- `generateNewWallet()` - Create a random wallet
- `createWalletFromPrivateKey()` - Import from private key
- `createWalletFromMnemonic()` - Restore from seed phrase
- `getEthereumProvider()` - Connect to Ethereum
- `getBSCProvider()` - Connect to BSC
- `checkEthereumBalance()` - Get ETH balance
- `checkBSCBalance()` - Get BNB balance
- `sendEthereumTransaction()` - Send ETH/tokens

### deploy-token.js

Methods available:
- `deployToken(name, symbol, supply)` - Deploy ERC-20 token
- `getContractInfo(address)` - Get token details
- `sendToken(contractAddress, toAddress, amount)` - Transfer tokens

## 🔑 API Key Setup

### Quick Setup

Looking for your API keys? Run this:

```bash
npm run setup
```

This interactive wizard will help you:
- Get your Infura API key (for Ethereum & Starknet)
- Configure Etherscan API key (optional)
- Set up BSCScan API key (optional)
- Choose your default network (testnet/mainnet)

### Where to Get API Keys

| Service | Purpose | Link | Free Tier |
|---------|---------|------|-----------|
| **Infura** | Ethereum & Starknet RPC | https://infura.io | 100k req/day |
| **Etherscan** | Contract verification | https://etherscan.io/apis | 100k calls/day |
| **BSCScan** | BSC verification | https://bscscan.com/apis | 100k calls/day |

### Need Help?

- 🔍 **[Quick Reference](./FIND_API_KEYS.md)** - Where to find your API keys
- 📖 **[Complete Guide](./API_KEY_GUIDE.md)** - Detailed API key setup instructions
- ⚙️ **[Setup Guide](./SETUP_GUIDE.md)** - Full project setup

---

## 🚀 Deployment Examples

### Deploy Token on Ethereum Testnet

```bash
node -e "
const TokenDeployer = require('./deploy-token.js');
const deployer = new TokenDeployer('testnet', 'ethereum');
deployer.deployToken('My Token', 'MTK', 1000000)
  .then(info => console.log('Deployed:', info))
  .catch(err => console.error('Error:', err));
"
```

### Deploy Token on BSC Testnet

```bash
node -e "
const TokenDeployer = require('./deploy-token.js');
const deployer = new TokenDeployer('testnet', 'bsc');
deployer.deployToken('Binance Token', 'BNTK', 500000)
  .then(info => console.log('Deployed:', info))
  .catch(err => console.error('Error:', err));
"
```

## 📊 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run setup` | Interactive API key setup wizard |
| `npm run setup:api-keys` | Same as setup (alternative command) |
| `npm run deploy:eth:testnet` | Deploy to Ethereum Sepolia |
| `npm run deploy:eth:mainnet` | Deploy to Ethereum Mainnet |
| `npm run deploy:bsc:testnet` | Deploy to BSC Testnet |
| `npm run deploy:bsc:mainnet` | Deploy to BSC Mainnet |
| `npm run check:balance:eth` | Check Ethereum balance |
| `npm run check:balance:bsc` | Check BSC balance |
| `npm run wallet:generate` | Generate new wallet |
| `npm run wallet:info` | Show wallet information |

## 🔐 Security Best Practices

1. **Never commit .env file** - Add to .gitignore
2. **Use testnet first** - Always test before mainnet
3. **Keep backups** - Store seed phrases safely
4. **Use hardware wallets** - For mainnet deployments
5. **Verify contracts** - Check contract code on block explorers

## 📚 Supported Networks

| Network | Mainnet RPC | Testnet RPC | Explorer |
|---------|-----------|-----------|----------|
| Ethereum | mainnet.infura.io | sepolia.infura.io | etherscan.io |
| BSC | bsc-dataseed.binance.org | data-seed-prebsc-1-s1.binance.org | bscscan.com |
| Starknet | starknet-mainnet.infura.io | starknet-goerli.infura.io | starkscan.co |

## 🆘 Troubleshooting

**Error: PRIVATE_KEY not found**
- Make sure you have a .env file with PRIVATE_KEY set

**Error: Insufficient balance**
- Request testnet funds from the faucet for your blockchain

**Error: RPC URL not configured**
- Check your .env file has the correct RPC URLs

**Error: Contract deployment failed**
- Ensure you have enough balance for gas fees
- Check your private key is valid

## 📞 Support & Resources

- [Ethers.js Documentation](https://docs.ethers.io/)
- [Hardhat Documentation](https://hardhat.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Ethereum Docs](https://ethereum.org/en/developers/)
- [BSC Documentation](https://docs.bnbchain.org/)
- [Starknet Documentation](https://docs.starknet.io/)

## 📝 License

MIT - Feel free to use for learning and development

---

**Happy Smart Contract Development! 🎉**