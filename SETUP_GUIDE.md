# 🚀 Complete Setup Guide - Token Retrieval & Management

This guide will walk you through everything needed to retrieve, manage, and transfer tokens on Ethereum and Binance Smart Chain.

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A code editor (VS Code recommended)

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages:

- `ethers` - Ethereum library
- `web3` - Web3 library
- `dotenv` - Environment variables
- `axios` - HTTP client
- `chalk` - Terminal colors

### Step 2: Configure Your Environment

```bash
cp .env.example .env
```

Edit `.env` file with your settings (see below for details).

### Step 3: Generate or Import Wallet

**Option A: Generate New Wallet**

```bash
npm run generate:wallet
```

This creates:

- New wallet address
- Private key
- Mnemonic seed phrase

**⚠️ SAVE THESE SECURELY!**

**Option B: Import Existing Wallet**

Add your existing credentials to `.env`:

```env
PRIVATE_KEY=your_existing_private_key_here
WALLET_ADDRESS_ETH=your_existing_address_here
```

### Step 4: Get Testnet Funds

Visit these faucets to get free testnet tokens:

**Ethereum Sepolia:**

- <https://sepolia-faucet.pk910.de/>
- <https://www.alchemy.com/faucets/ethereum-sepolia>

**BSC Testnet:**

- <https://testnet.binance.org/faucet-smart>

Enter your wallet address and request funds.

### Step 5: Verify Setup

```bash
npm run check:balance:eth
```

You should see your balance! 🎉

---

## 🔧 Detailed Configuration

### Environment Variables (.env)

```env
# RPC URLs - Get from Infura, Alchemy, or QuickNode
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_API_KEY
ETHEREUM_TESTNET_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
BSC_RPC_URL=https://bsc-dataseed.binance.org/
BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/

# Your Wallet Credentials (NEVER share private key!)
PRIVATE_KEY=0x1234567890abcdef...
MNEMONIC=word1 word2 word3 ... word12

# API Keys for Block Explorers (Optional but recommended)
ETHERSCAN_API_KEY=your_etherscan_api_key
BSCSCAN_API_KEY=your_bscscan_api_key

# Public Addresses (Safe to share)
WALLET_ADDRESS_ETH=0x...

# Network Mode
NETWORK=testnet  # or "mainnet" for production
```

### Getting RPC URLs

**Infura (Free Tier Available):**

1. Sign up at <https://infura.io>
2. Create a new project
3. Copy the project ID
4. Use format: `https://mainnet.infura.io/v3/YOUR_PROJECT_ID`

**Alchemy (Free Tier Available):**

1. Sign up at <https://www.alchemy.com>
2. Create app
3. Copy the HTTP URL

**Public RPCs (No registration):**

- BSC: `https://bsc-dataseed.binance.org/`
- BSC Testnet: `https://data-seed-prebsc-1-s1.binance.org:8545/`

### Getting API Keys for Explorers

**Etherscan:**

1. Visit <https://etherscan.io/apis>
2. Create account
3. Generate API key (free)

**BSCScan:**

1. Visit <https://bscscan.com/apis>
2. Create account
3. Generate API key (free)

---

## 💰 Retrieving Tokens - Complete Guide

### Check Native Balance (ETH/BNB)

```bash
# Ethereum
npm run check:balance:eth

# Binance Smart Chain
npm run check:balance:bsc
```

**Output:**

```
💰 Checking ETH Balance...

Wallet Address: 0x1234...
Network: testnet
Chain: ETH

Balance: 0.5 ETH
```

### Check ERC20 Token Balance

**Known tokens (automatic check):**

```bash
npm run check:tokens:eth
npm run check:tokens:bsc
```

**Specific token by contract address:**

```bash
npm run check:tokens:eth -- 0xTokenContractAddress
npm run check:tokens:bsc -- 0xTokenContractAddress
```

**Example:**

```bash
# Check USDT on Ethereum
npm run check:tokens:eth -- 0xdac17f958d2ee523a2206206994597c13d831ec7
```

### Retrieve All Tokens (Comprehensive Scan)

```bash
npm run retrieve:tokens eth
npm run retrieve:tokens bsc
```

This will:

1. Show your native balance (ETH/BNB)
2. Scan for all ERC20 tokens you've interacted with
3. Display balances for each token
4. Show token contract addresses

**Requirements:**

- API key configured in `.env` (ETHERSCAN_API_KEY or BSCSCAN_API_KEY)
- Without API key, you'll need to check tokens manually by contract address

---

## 📤 Transferring Tokens

### Transfer Native Currency (ETH/BNB)

```bash
npm run transfer:token -- <chain> native <recipient_address> <amount>
```

**Examples:**

```bash
# Send 0.1 ETH
npm run transfer:token -- eth native 0xRecipientAddress 0.1

# Send 0.5 BNB
npm run transfer:token -- bsc native 0xRecipientAddress 0.5
```

### Transfer ERC20 Tokens

```bash
npm run transfer:token -- <chain> <token_contract> <recipient_address> <amount>
```

**Examples:**

```bash
# Send 100 USDT on Ethereum
npm run transfer:token -- eth 0xdac17f958d2ee523a2206206994597c13d831ec7 0xRecipient 100

# Send 50 tokens
npm run transfer:token -- bsc 0xTokenContract 0xRecipient 50
```

**What happens:**

1. Script checks your balance
2. Verifies you have enough tokens
3. Sends the transaction
4. Waits for confirmation
5. Shows transaction hash and explorer link

---

## 🎯 Common Use Cases

### Use Case 1: Receive Tokens

**Step-by-step:**

1. Get your wallet address:

```bash
npm run generate:wallet
# OR check existing: node -e "console.log(process.env.WALLET_ADDRESS_ETH)" 
```

1. Share your public address with sender

2. Check balance after receiving:

```bash
npm run check:balance:eth
npm run check:tokens:eth
```

### Use Case 2: Check All Your Holdings

```bash
# Quick overview
npm run retrieve:tokens eth

# Detailed check for specific tokens
npm run check:tokens:eth -- 0xTokenAddress1
npm run check:tokens:eth -- 0xTokenAddress2
```

### Use Case 3: Send Tokens to Someone

```bash
# 1. Check your balance first
npm run check:tokens:eth -- 0xTokenContractAddress

# 2. Transfer
npm run transfer:token -- eth 0xTokenContract 0xRecipient 100
```

### Use Case 4: Monitor Multiple Wallets

Create multiple `.env` files:

- `.env.wallet1`
- `.env.wallet2`

Load different configs:

```bash
cp .env.wallet1 .env
npm run check:balance:eth

cp .env.wallet2 .env
npm run check:balance:eth
```

---

## 🔐 Security Best Practices

### ✅ DO

- ✅ Keep your private key and mnemonic secure
- ✅ Use `.env` file (it's in `.gitignore`)
- ✅ Test on testnet before mainnet
- ✅ Double-check recipient addresses
- ✅ Backup your mnemonic phrase offline
- ✅ Use hardware wallets for large amounts

### ❌ DON'T

- ❌ Share your private key or mnemonic
- ❌ Commit `.env` to Git
- ❌ Store keys in plain text files
- ❌ Use the same wallet for testing and mainnet
- ❌ Click suspicious links or connect to unknown sites

---

## 🐛 Troubleshooting

### "Please set PRIVATE_KEY in .env file"

**Solution:**

1. Copy `.env.example` to `.env`
2. Add your private key to the `PRIVATE_KEY` field
3. Or run `npm run generate:wallet` to create new one

### "Insufficient balance"

**Solutions:**

- For testnet: Use faucets to get free tokens
- For mainnet: Add funds to your wallet
- Check you're on the correct network (testnet vs mainnet)

### "Failed to get token balance"

**Possible causes:**

1. Invalid token contract address
2. Token doesn't exist on this network
3. Network connectivity issues

**Solutions:**

- Verify contract address on Etherscan/BSCScan
- Check you're using correct network (testnet vs mainnet)
- Verify RPC URL is working

### "Transaction failed"

**Common reasons:**

1. Insufficient gas
2. Insufficient token balance
3. Wrong network
4. Invalid recipient address

**Solutions:**

- Check native balance for gas fees
- Verify token balance
- Confirm network setting in `.env`
- Double-check recipient address format

### API Key Errors

**Issue:** Cannot retrieve token list

**Solution:**

- Add Etherscan/BSCScan API key to `.env`
- Get free key from respective websites
- Or check tokens manually by contract address

---

## 📚 Command Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run generate:wallet` | Create new wallet |
| `npm run check:balance:eth` | Check ETH balance |
| `npm run check:balance:bsc` | Check BNB balance |
| `npm run check:tokens:eth` | Check ERC20 tokens on Ethereum |
| `npm run check:tokens:bsc` | Check BEP20 tokens on BSC |
| `npm run retrieve:tokens eth` | Scan all tokens on Ethereum |
| `npm run retrieve:tokens bsc` | Scan all tokens on BSC |
| `npm run transfer:token` | Transfer tokens |
| `npm run deploy:token` | Deploy new token contract |

---

## 🌐 Useful Resources

### Blockchain Explorers

- **Ethereum Mainnet:** <https://etherscan.io>
- **Ethereum Sepolia:** <https://sepolia.etherscan.io>
- **BSC Mainnet:** <https://bscscan.com>
- **BSC Testnet:** <https://testnet.bscscan.com>

### Development Tools

- **Remix IDE:** <https://remix.ethereum.org>
- **MetaMask Wallet:** <https://metamask.io>
- **Infura RPC:** <https://infura.io>
- **Alchemy RPC:** <https://www.alchemy.com>

### Documentation

- **Ethers.js:** <https://docs.ethers.org>
- **Web3.js:** <https://web3js.readthedocs.io>
- **OpenZeppelin:** <https://docs.openzeppelin.com>

---

## 💡 Tips & Tricks

### Save on Gas Fees

- Use testnet for development
- Transfer during low network activity
- Batch transfers when possible
- Compare gas prices: <https://etherscan.io/gastracker>

### Organize Multiple Tokens

Create a tokens list file:

```json
{
  "eth": [
    {"symbol": "USDT", "address": "0xdac..."},
    {"symbol": "USDC", "address": "0xa0b..."}
  ]
}
```

### Automate Balance Checks

Create a cron job or scheduled task:

```bash
# Add to crontab (Linux/Mac)
0 */6 * * * cd /path/to/project && npm run retrieve:tokens eth
```

---

## 📞 Support

Need help?

1. Check this guide first
2. Review error messages carefully
3. Search documentation links above
4. Check blockchain explorer for transaction status

---

## ⚖️ License

MIT License - Use at your own risk

**Disclaimer:** This is educational software. Always audit code before using with real funds. Test thoroughly on testnets first.

---

**Last Updated:** February 2026
**Version:** 1.0.0
