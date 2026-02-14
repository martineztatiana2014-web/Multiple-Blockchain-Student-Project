# 🔑 Quick API Key Reference

**Looking for your Starknet and Ethereum API keys?** You've come to the right place!

## 🎯 What You Need

For **Starknet** and **Ethereum**, you need:
- **One Infura API Key** (works for both networks!)

Optional (but recommended):
- Etherscan API Key (for contract verification)
- BSCScan API Key (for BSC contract verification)

---

## ⚡ Quick Setup (2 Minutes)

### Method 1: Automated Setup (Recommended)

Run our interactive setup wizard:

```bash
npm run setup
```

This will guide you through the entire process!

### Method 2: Manual Setup

1. **Get Infura API Key:**
   - Go to: https://infura.io
   - Sign up (free)
   - Create new project
   - Copy your Project ID

2. **Configure .env file:**
   ```bash
   cp .env.example .env
   nano .env  # or use your favorite editor
   ```

3. **Add your key to .env:**
   ```env
   ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_API_KEY_HERE
   STARKNET_RPC_URL=https://starknet-mainnet.infura.io/v3/YOUR_API_KEY_HERE
   ```

4. **Test it:**
   ```bash
   npm run check:balance:eth
   ```

---

## 📍 Where to Find Your API Keys

### Infura (Ethereum & Starknet)

**Where to get it:**
- Website: https://infura.io
- Sign up → Create Project → Copy "Project ID"

**What it looks like:**
```
32 characters: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Where to use it:**
```env
# In your .env file:
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
ETHEREUM_TESTNET_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
STARKNET_RPC_URL=https://starknet-mainnet.infura.io/v3/YOUR_PROJECT_ID
STARKNET_TESTNET_RPC_URL=https://starknet-goerli.infura.io/v3/YOUR_PROJECT_ID
```

**Free Tier:**
- ✅ 100,000 requests/day
- ✅ All networks included
- ✅ Perfect for development

---

### Etherscan (Optional - Contract Verification)

**Where to get it:**
- Website: https://etherscan.io/apis
- Sign up → My API Keys → Add → Copy key

**What it looks like:**
```
34 characters: ABC123DEF456GHI789JKL012MNO345PQR
```

**Where to use it:**
```env
# In your .env file:
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY_HERE
```

**Free Tier:**
- ✅ 5 calls/second
- ✅ 100,000 calls/day

---

### BSCScan (Optional - BSC Verification)

**Where to get it:**
- Website: https://bscscan.com/apis
- Sign up → My API Keys → Add → Copy key

**Where to use it:**
```env
# In your .env file:
BSCSCAN_API_KEY=YOUR_BSCSCAN_KEY_HERE
```

---

## 🎬 Step-by-Step Video Guide

### Getting Infura API Key

1. Open https://infura.io in your browser
2. Click "Get Started for Free" (top right)
3. Fill in your email and password
4. Verify your email (check inbox)
5. Log in to dashboard
6. Click "Create New Key" button
7. Select "Web3 API"
8. Name it (e.g., "My Dev Project")
9. Click "Create"
10. **Copy the Project ID** - this is your API key!

**Screenshot locations:**
- Dashboard: Top navigation → "Dashboard"
- API Keys: Left sidebar → "API Keys"
- Project ID: In the project details page

---

## 📋 Current Setup Status

### Check if you already have API keys configured:

```bash
# Check if .env file exists
ls -la .env

# View current configuration (safely)
grep "RPC_URL" .env | head -5

# Test connection
npm run check:balance:eth
```

### If .env doesn't exist:

```bash
# Copy template
cp .env.example .env

# Run setup wizard
npm run setup
```

---

## 🆘 Troubleshooting

### "I can't find my API key!"

**For Infura:**
1. Log in to https://infura.io
2. Go to Dashboard
3. Click on your project name
4. Look for "PROJECT ID" - that's your API key!

**For Etherscan:**
1. Log in to https://etherscan.io
2. Click your profile (top right)
3. Select "API Keys"
4. Your keys are listed there

### "My API key isn't working!"

**Common issues:**
1. ✅ Check for typos or extra spaces
2. ✅ Make sure you copied the entire key
3. ✅ Verify the project is active in Infura dashboard
4. ✅ Ensure you're using the right format in .env file
5. ✅ Restart your application after changing .env

### "Do I need different keys for testnet and mainnet?"

**No!** The same Infura API key works for:
- ✅ Ethereum Mainnet
- ✅ Ethereum Sepolia Testnet
- ✅ Starknet Mainnet
- ✅ Starknet Goerli Testnet

Just use different URLs with the same key!

---

## 💰 Cost Breakdown

| Service | Free Tier | Cost | Best For |
|---------|-----------|------|----------|
| **Infura** | 100k req/day | $0 - $50+/mo | Most users |
| **Alchemy** | 300M compute units | $0 - $49+/mo | Heavy usage |
| **Etherscan API** | 100k calls/day | Free | Contract verification |
| **BSCScan API** | 100k calls/day | Free | BSC verification |

💡 **Tip:** Start with free tiers - they're usually more than enough for development!

---

## 🔐 Security Checklist

Before you start:

- [ ] Created .env file from .env.example
- [ ] Added your Infura API key
- [ ] Verified .env is in .gitignore
- [ ] Never shared your .env file
- [ ] Using testnet for development
- [ ] Kept backup of API keys in password manager

---

## 📚 Additional Resources

**Detailed Guides:**
- Full Setup Guide: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Comprehensive API Guide: [API_KEY_GUIDE.md](./API_KEY_GUIDE.md)
- Quick Start: [QUICKSTART.md](./QUICKSTART.md)
- Main README: [README.md](./README.md)

**Official Documentation:**
- Infura: https://docs.infura.io/
- Ethereum: https://ethereum.org/developers
- Starknet: https://docs.starknet.io/
- Etherscan API: https://docs.etherscan.io/

**Video Tutorials:**
- How to Get Infura API Key: https://www.youtube.com/results?search_query=infura+api+key
- Ethereum Development Setup: https://www.youtube.com/results?search_query=ethereum+development+setup

---

## 🎯 Summary

**To get started with Starknet and Ethereum:**

1. Sign up at https://infura.io (free)
2. Create a project and get your Project ID
3. Run `npm run setup` in this directory
4. Enter your Infura Project ID when prompted
5. Test with `npm run check:balance:eth`
6. Done! 🎉

**Need help?** Read the full [API_KEY_GUIDE.md](./API_KEY_GUIDE.md)

---

**Last Updated:** February 2026  
**Version:** 1.0.0
