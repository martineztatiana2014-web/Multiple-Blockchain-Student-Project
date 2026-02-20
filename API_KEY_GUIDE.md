# 🔑 API Key Retrieval Guide - Starknet & Ethereum

This guide will help you obtain all the necessary API keys for working with Starknet and Ethereum networks.

## 📋 Overview

You need the following API keys:

1. **Infura API Key** - For connecting to Ethereum and Starknet networks
2. **Etherscan API Key** (Optional) - For contract verification on Ethereum
3. **Block Explorer API Keys** (Optional) - For additional functionality

---

## 🌟 Step 1: Get Your Infura API Key

Infura provides RPC endpoints for both Ethereum and Starknet. One API key works for both!

### Sign Up for Infura

1. **Visit Infura Website:**
   - Go to: https://infura.io
   - Click "Get Started for Free" or "Sign Up"

2. **Create an Account:**
   - Enter your email address
   - Create a password
   - Verify your email

3. **Create a New Project:**
   - Log into your dashboard
   - Click "Create New Key" or "Create New Project"
   - Select "Web3 API" as the network
   - Give it a name (e.g., "My Token Project")

4. **Get Your API Key:**
   - Click on your project name
   - Find the "API Key" section
   - Copy your Project ID - this is your API key!

### Your Infura URLs

Once you have your API key (Project ID), you can construct your RPC URLs:

**Ethereum Mainnet:**
```
https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY
```

**Ethereum Sepolia Testnet:**
```
https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
```

**Starknet Mainnet:**
```
https://starknet-mainnet.infura.io/v3/YOUR_INFURA_API_KEY
```

**Starknet Goerli Testnet:**
```
https://starknet-goerli.infura.io/v3/YOUR_INFURA_API_KEY
```

### Infura Free Tier

The free tier includes:
- ✅ 100,000 requests per day
- ✅ Access to all supported networks
- ✅ Both Ethereum and Starknet
- ✅ Perfect for development and testing

---

## 🔍 Step 2: Get Etherscan API Key (Optional but Recommended)

Etherscan API keys are used for contract verification and retrieving transaction history.

### Sign Up for Etherscan

1. **Visit Etherscan:**
   - Go to: https://etherscan.io/register

2. **Create Account:**
   - Enter username, email, password
   - Verify your email

3. **Generate API Key:**
   - Log in to https://etherscan.io/login
   - Go to "API-KEYs" section (in the top menu under your profile)
   - Click "Add" to create a new API key
   - Give it a name (e.g., "Token Development")
   - Copy the generated API key

### Etherscan Free Tier

The free tier includes:
- ✅ 5 API calls per second
- ✅ 100,000 calls per day
- ✅ Perfect for most development needs

---

## 🌐 Alternative RPC Providers

If you prefer alternatives to Infura:

### Alchemy (Alternative to Infura)

1. **Sign Up:** https://www.alchemy.com
2. **Create App:**
   - Choose your network (Ethereum, Polygon, etc.)
   - Select mainnet or testnet
3. **Copy HTTP URL** from the app dashboard

**Benefits:**
- More generous free tier
- Better debugging tools
- Real-time webhooks

### QuickNode (Another Alternative)

1. **Sign Up:** https://www.quicknode.com
2. **Create Endpoint**
3. **Copy the HTTP URL**

### Public RPC Endpoints (No Registration)

**Binance Smart Chain:**
- Mainnet: `https://bsc-dataseed.binance.org/`
- Testnet: `https://data-seed-prebsc-1-s1.binance.org:8545/`

⚠️ Note: Public endpoints have rate limits and may be slower.

---

## ⚙️ Step 3: Configure Your .env File

After obtaining your API keys, add them to your `.env` file:

### Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file:**
   ```bash
   # Use your favorite editor
   nano .env
   # or
   vim .env
   # or open in VS Code
   code .env
   ```

3. **Replace the placeholder values:**

```env
# Ethereum RPC URLs - Replace YOUR_INFURA_API_KEY with your actual key
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY
ETHEREUM_TESTNET_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY

# Starknet RPC URLs - Use the same Infura API key
STARKNET_RPC_URL=https://starknet-mainnet.infura.io/v3/YOUR_INFURA_API_KEY
STARKNET_TESTNET_RPC_URL=https://starknet-goerli.infura.io/v3/YOUR_INFURA_API_KEY

# BSC doesn't need API keys for public endpoints
BSC_RPC_URL=https://bsc-dataseed.binance.org/
BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/

# Your Wallet Private Key (Keep this SECRET!)
PRIVATE_KEY=your_private_key_here

# Block Explorer API Keys (Optional)
ETHERSCAN_API_KEY=your_etherscan_api_key
BSCSCAN_API_KEY=your_bscscan_api_key

# Wallet Addresses
WALLET_ADDRESS_ETH=0x...
WALLET_ADDRESS_STARKNET=0x...

# Network Configuration
NETWORK=testnet  # Use testnet for development
```

4. **Save the file** and keep it secure!

---

## 🧪 Step 4: Test Your Configuration

After setting up your API keys, test the connection:

### Test Ethereum Connection

```bash
npm run check:balance:eth
```

Expected output:
```
✅ Connected to Ethereum network
💰 Your ETH balance: 0.0 ETH
```

### Test with Node.js

Create a quick test:

```bash
node -e "
require('dotenv').config();
const { ethers } = require('ethers');

async function test() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.ETHEREUM_TESTNET_RPC_URL
    );
    const blockNumber = await provider.getBlockNumber();
    console.log('✅ Connected! Current block:', blockNumber);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

test();
"
```

If this works, your API key is configured correctly! 🎉

---

## 🔐 Security Best Practices

### ✅ DO:

1. **Keep your .env file private**
   - Never commit it to Git
   - It's already in .gitignore

2. **Use different keys for different projects**
   - Helps track usage
   - Easier to rotate if compromised

3. **Use testnet for development**
   - Avoid wasting gas fees
   - No risk of losing real funds

4. **Backup your API keys securely**
   - Store in password manager
   - Keep offline backup

### ❌ DON'T:

1. **Never share your API keys publicly**
   - Don't post in forums
   - Don't commit to GitHub
   - Don't share in screenshots

2. **Never use production keys in development**
   - Keep them separate
   - Use testnet keys for testing

3. **Don't hardcode API keys in source code**
   - Always use environment variables
   - Use .env files

---

## 📊 API Key Summary Table

| Service | Purpose | Free Tier | Registration Link |
|---------|---------|-----------|------------------|
| **Infura** | Ethereum & Starknet RPC | 100k req/day | https://infura.io |
| **Alchemy** | Alternative RPC provider | 300M compute units/mo | https://alchemy.com |
| **Etherscan** | Contract verification | 100k calls/day | https://etherscan.io/apis |
| **BSCScan** | BSC contract verification | 100k calls/day | https://bscscan.com/apis |
| **QuickNode** | Alternative RPC | 100M credits/mo | https://quicknode.com |

---

## 🆘 Troubleshooting

### "Invalid API Key" Error

**Problem:** Your API key is not working

**Solutions:**
1. Verify you copied the entire API key
2. Check for extra spaces or characters
3. Ensure you're using the right key for the right service
4. Confirm your Infura project has the correct network enabled

### "Rate Limit Exceeded"

**Problem:** Too many requests

**Solutions:**
1. Wait a few minutes and try again
2. Upgrade to a paid tier
3. Use multiple API keys and rotate them
4. Cache responses when possible

### "Connection Refused"

**Problem:** Cannot connect to RPC endpoint

**Solutions:**
1. Check your internet connection
2. Verify the RPC URL is correct
3. Ensure the network is not under maintenance
4. Try a different RPC provider

### API Key Not Loading

**Problem:** .env file not being read

**Solutions:**
1. Ensure .env file is in the project root
2. Restart your application
3. Check file permissions (should be readable)
4. Verify you're loading dotenv: `require('dotenv').config()`

---

## 🚀 Quick Start Checklist

- [ ] Sign up for Infura account
- [ ] Create new project in Infura
- [ ] Copy your Infura Project ID (API key)
- [ ] (Optional) Sign up for Etherscan
- [ ] (Optional) Generate Etherscan API key
- [ ] Copy .env.example to .env
- [ ] Add your Infura API key to .env
- [ ] Add Etherscan API key to .env (if obtained)
- [ ] Save and secure your .env file
- [ ] Test connection with `npm run check:balance:eth`
- [ ] You're ready to start developing! 🎉

---

## 📞 Additional Resources

### Documentation

- **Infura Docs:** https://docs.infura.io/
- **Etherscan API Docs:** https://docs.etherscan.io/
- **Starknet Docs:** https://docs.starknet.io/
- **Ethereum Docs:** https://ethereum.org/en/developers/

### Getting Help

- **Infura Support:** https://support.infura.io/
- **Ethereum Stack Exchange:** https://ethereum.stackexchange.com/
- **Starknet Discord:** https://discord.gg/starknet

---

## 💡 Pro Tips

1. **Monitor Your Usage:**
   - Check Infura dashboard regularly
   - Set up usage alerts
   - Track which apps use which keys

2. **API Key Rotation:**
   - Rotate keys every few months
   - Use different keys for production and development
   - Keep old keys for 24-48 hours during rotation

3. **Performance Optimization:**
   - Cache blockchain data when possible
   - Use WebSocket connections for real-time data
   - Batch multiple requests together

4. **Cost Savings:**
   - Start with free tiers
   - Monitor usage before upgrading
   - Use public RPCs for non-critical operations
   - Consider running your own node for heavy usage

---

**Last Updated:** February 2026  
**Status:** Active  

🎉 **You now have all the information needed to obtain and configure your API keys for Starknet and Ethereum development!**
