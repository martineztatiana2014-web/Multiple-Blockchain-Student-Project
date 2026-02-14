# ✅ API Key Setup Checklist

Use this checklist to track your progress in setting up API keys for Starknet and Ethereum.

## 🎯 Getting Started

- [ ] I understand I need API keys to connect to Ethereum and Starknet networks
- [ ] I have read [START_HERE.md](./START_HERE.md) or [FIND_API_KEYS.md](./FIND_API_KEYS.md)
- [ ] I have Node.js and npm installed on my computer
- [ ] I have run `npm install` in this directory

## 🔑 Step 1: Get Infura API Key (REQUIRED)

- [ ] Visited https://infura.io
- [ ] Created an Infura account
- [ ] Verified my email address
- [ ] Logged into Infura dashboard
- [ ] Created a new project (selected "Web3 API")
- [ ] Copied my Project ID (this is my Infura API key)
- [ ] Saved my API key securely

**My Infura API Key looks like:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` (32 characters)

## 📊 Step 2: Get Etherscan API Key (OPTIONAL)

- [ ] Visited https://etherscan.io/apis
- [ ] Created an Etherscan account
- [ ] Verified my email
- [ ] Navigated to "API Keys" section
- [ ] Created a new API key
- [ ] Copied my Etherscan API key
- [ ] Saved my API key securely

**OR**

- [ ] I'm skipping Etherscan for now (can add later)

## 🔐 Step 3: Get BSCScan API Key (OPTIONAL)

- [ ] Visited https://bscscan.com/apis
- [ ] Created a BSCScan account
- [ ] Verified my email
- [ ] Navigated to "API Keys" section
- [ ] Created a new API key
- [ ] Copied my BSCScan API key
- [ ] Saved my API key securely

**OR**

- [ ] I'm skipping BSCScan for now (can add later)

## ⚙️ Step 4: Configure Your Environment

Choose one method:

### Method A: Automated Setup (Recommended)

- [ ] Ran `npm run setup` in terminal
- [ ] Followed the interactive prompts
- [ ] Entered my Infura API key when asked
- [ ] Entered my Etherscan API key (or skipped)
- [ ] Entered my BSCScan API key (or skipped)
- [ ] Selected network (testnet or mainnet)
- [ ] Verified that .env file was created

### Method B: Manual Setup

- [ ] Ran `cp .env.example .env` to create .env file
- [ ] Opened .env file in text editor
- [ ] Replaced `YOUR_INFURA_API_KEY` with my actual Infura key in all URLs
- [ ] Replaced `your_etherscan_api_key` with my actual key (or left as-is)
- [ ] Replaced `your_bscscan_api_key` with my actual key (or left as-is)
- [ ] Set `NETWORK=testnet` for development
- [ ] Saved the .env file

## 🧪 Step 5: Test Your Configuration

- [ ] Verified .env file exists: `ls -la .env`
- [ ] Checked my configuration looks correct (API keys are filled in)
- [ ] Attempted to run: `npm run check:balance:eth`

**Expected Results:**

✅ If successful: Shows "Connected to Ethereum network" or "Balance: 0 ETH"
❌ If failed: Shows error message about invalid API key or connection

## 🎉 Step 6: Confirm Everything Works

- [ ] No error messages when running balance check
- [ ] Can connect to Ethereum network
- [ ] Can connect to BSC network (if testing)
- [ ] Ready to start development!

## 🔐 Security Checklist

- [ ] My .env file is NOT committed to Git
- [ ] I verified .env is in .gitignore
- [ ] I saved my API keys in a secure location (password manager)
- [ ] I understand to NEVER share my private keys
- [ ] I'm using testnet for development (not mainnet)

## 📝 Important Notes

### What Each API Key Does:

**Infura API Key:**
- ✅ Connects you to Ethereum Mainnet
- ✅ Connects you to Ethereum Sepolia Testnet
- ✅ Connects you to Starknet Mainnet
- ✅ Connects you to Starknet Goerli Testnet
- 🆓 Free tier: 100,000 requests/day

**Etherscan API Key (Optional):**
- ✅ Verify smart contracts on Etherscan
- ✅ Retrieve transaction history
- ✅ Get token balances
- 🆓 Free tier: 100,000 calls/day

**BSCScan API Key (Optional):**
- ✅ Verify smart contracts on BSC
- ✅ Retrieve BSC transaction history
- 🆓 Free tier: 100,000 calls/day

### Common Issues:

**Issue:** "Invalid API Key" error
- ✅ Check for typos in .env file
- ✅ Make sure you copied the full API key
- ✅ Verify no extra spaces before or after the key

**Issue:** "Cannot find .env file"
- ✅ Run `cp .env.example .env` first
- ✅ Make sure you're in the correct directory

**Issue:** "Rate limit exceeded"
- ✅ You've used all your free API calls for today
- ✅ Wait until tomorrow or upgrade to paid tier
- ✅ Check if you have multiple apps using the same key

## 🆘 Need Help?

If you're stuck:

1. **Read the guides:**
   - [START_HERE.md](./START_HERE.md) - Quick overview
   - [FIND_API_KEYS.md](./FIND_API_KEYS.md) - Where to find keys
   - [API_KEY_GUIDE.md](./API_KEY_GUIDE.md) - Complete guide

2. **Check your progress:**
   - Review which items above you haven't checked off
   - Make sure you completed each step

3. **Common solutions:**
   - Delete .env and start over with `npm run setup`
   - Verify your Infura project is active in dashboard
   - Check internet connection

## 🎯 What's Next?

After completing this checklist:

- [ ] Set up my wallet (see [QUICKSTART.md](./QUICKSTART.md))
- [ ] Get testnet funds from faucets
- [ ] Try checking my balance
- [ ] Start building!

---

**Completion Status:**

- Total Required Steps: 6
- Total Optional Steps: 2
- Security Items: 5

**Last Updated:** February 2026

✨ **You're doing great! Complete all the required steps and you'll be ready to develop on Ethereum and Starknet!**
