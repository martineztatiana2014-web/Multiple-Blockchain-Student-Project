# 🚀 Quick Start - Get Your Tokens in 5 Minutes

## Step 1: Install Everything (1 minute)

```bash
npm install
```

## Step 2: Setup Your Wallet (2 minutes)

### Option A: Create New Wallet

```bash
npm run generate:wallet
```

**⚠️ IMPORTANT:** Save the output! You'll need:

- ✅ Private Key
- ✅ Mnemonic Phrase
- ✅ Wallet Address

### Option B: Use Existing Wallet

Copy the environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your existing private key:

```env
PRIVATE_KEY=your_private_key_here
WALLET_ADDRESS_ETH=your_address_here
```

## Step 3: Get Testnet Funds (1 minute)

Visit a faucet and enter your wallet address:

**Ethereum Sepolia:**
👉 <https://sepolia-faucet.pk910.de/>

**BSC Testnet:**
👉 <https://testnet.binance.org/faucet-smart>

## Step 4: Check Your Balance (30 seconds)

```bash
# Check ETH
npm run check:balance:eth

# Check BNB
npm run check:balance:bsc
```

## Step 5: Retrieve Your Tokens (30 seconds)

```bash
# See all your ETH tokens
npm run retrieve:tokens eth

# See all your BSC tokens
npm run retrieve:tokens bsc
```

---

## 🎯 Common Tasks

### Check Specific Token

```bash
npm run check:tokens:eth -- 0xTokenContractAddress
```

### Transfer Tokens

```bash
npm run transfer:token -- eth native 0xRecipientAddress 0.1
```

### Transfer ERC20 Token

```bash
npm run transfer:token -- eth 0xTokenContract 0xRecipient 100
```

---

## 📝 Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Wallet created or imported
- [ ] Private key added to `.env`
- [ ] Testnet funds received
- [ ] Balance check working
- [ ] Token retrieval tested

---

## 🆘 Need Help?

### "Please set PRIVATE_KEY in .env file"

👉 Run `npm run generate:wallet` or add existing key to `.env`

### "Balance is 0"

👉 Visit testnet faucets (links above)

### More help?

👉 See `SETUP_GUIDE.md` for detailed documentation

---

## 🎉 You're Ready

Now you can:

- ✅ Check balances
- ✅ Retrieve all tokens
- ✅ Transfer tokens
- ✅ Deploy new tokens

**Next Steps:**

- Read `SETUP_GUIDE.md` for advanced usage
- Try `node examples.js` for code examples
- Check `README.md` for full documentation

---

**Happy coding! 🚀**
