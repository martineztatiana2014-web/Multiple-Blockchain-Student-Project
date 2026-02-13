/**
 * Quick Examples - Token Retrieval & Management
 * 
 * Run these examples to quickly test functionality
 */

const WalletManager = require('./wallet-config');
require('dotenv').config();

// Example 1: Generate a new wallet
async function example1_generateWallet() {
    console.log('\n=== Example 1: Generate New Wallet ===\n');

    const manager = new WalletManager();
    const wallet = manager.generateNewWallet();

    console.log('Address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
    console.log('Mnemonic:', wallet.mnemonic);
    console.log('\n⚠️  Save these securely!\n');
}

// Example 2: Import wallet from private key
async function example2_importWallet() {
    console.log('\n=== Example 2: Import Wallet from Private Key ===\n');

    const manager = new WalletManager();

    // Replace with your private key
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey || privateKey === 'your_private_key_here') {
        console.log('⚠️  Set PRIVATE_KEY in .env file first');
        return;
    }

    const wallet = manager.createWalletFromPrivateKey(privateKey);
    console.log('Wallet Address:', wallet.address);
}

// Example 3: Check ETH balance
async function example3_checkBalance() {
    console.log('\n=== Example 3: Check ETH Balance ===\n');

    const manager = new WalletManager();

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey === 'your_private_key_here') {
        console.log('⚠️  Set PRIVATE_KEY in .env file first');
        return;
    }

    const wallet = manager.getConnectedWallet('eth', 'testnet');
    const balance = await manager.getBalance(wallet.address, 'eth', 'testnet');

    console.log('Address:', wallet.address);
    console.log('Balance:', balance, 'ETH');
}

// Example 4: Check specific token balance
async function example4_checkTokenBalance() {
    console.log('\n=== Example 4: Check Token Balance ===\n');

    const manager = new WalletManager();

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey === 'your_private_key_here') {
        console.log('⚠️  Set PRIVATE_KEY in .env file first');
        return;
    }

    const wallet = manager.getConnectedWallet('eth', 'mainnet');

    // Example: Check USDT balance on Ethereum mainnet
    const usdtAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

    try {
        const tokenInfo = await manager.getTokenBalance(
            wallet.address,
            usdtAddress,
            'eth',
            'mainnet'
        );

        console.log('Token:', tokenInfo.name);
        console.log('Symbol:', tokenInfo.symbol);
        console.log('Balance:', tokenInfo.formattedBalance);
        console.log('Contract:', tokenInfo.tokenAddress);
    } catch (error) {
        console.log('Error:', error.message);
    }
}

// Example 5: Multiple wallet addresses from same mnemonic
async function example5_multipleWallets() {
    console.log('\n=== Example 5: Generate Multiple Wallets from Mnemonic ===\n');

    const manager = new WalletManager();

    // Generate first wallet
    const wallet1 = manager.generateNewWallet();
    const mnemonic = wallet1.mnemonic;

    console.log('Generated Mnemonic:', mnemonic);
    console.log('\nDerived Wallets:');

    // Derive multiple wallets from same mnemonic
    for (let i = 0; i < 3; i++) {
        const wallet = manager.createWalletFromMnemonic(mnemonic, i);
        console.log(`  Wallet ${i}:`, wallet.address);
    }
}

// Example 6: Get balances for multiple chains
async function example6_multiChainBalances() {
    console.log('\n=== Example 6: Check Balances on Multiple Chains ===\n');

    const manager = new WalletManager();

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey === 'your_private_key_here') {
        console.log('⚠️  Set PRIVATE_KEY in .env file first');
        return;
    }

    const ethWallet = manager.getConnectedWallet('eth', 'testnet');
    const bscWallet = manager.getConnectedWallet('bsc', 'testnet');

    console.log('Address:', ethWallet.address);
    console.log('\nBalances:');

    const ethBalance = await manager.getBalance(ethWallet.address, 'eth', 'testnet');
    console.log('  ETH (Sepolia):', ethBalance);

    const bscBalance = await manager.getBalance(bscWallet.address, 'bsc', 'testnet');
    console.log('  BNB (Testnet):', bscBalance);
}

// Run examples
async function runExamples() {
    const args = process.argv.slice(2);
    const exampleNum = args[0];

    if (!exampleNum) {
        console.log('\n🎯 Available Examples:\n');
        console.log('  node examples.js 1  - Generate new wallet');
        console.log('  node examples.js 2  - Import wallet from private key');
        console.log('  node examples.js 3  - Check ETH balance');
        console.log('  node examples.js 4  - Check token balance (USDT)');
        console.log('  node examples.js 5  - Multiple wallets from mnemonic');
        console.log('  node examples.js 6  - Multi-chain balances');
        console.log('\n  node examples.js all  - Run all examples\n');
        return;
    }

    try {
        if (exampleNum === 'all') {
            await example1_generateWallet();
            await example2_importWallet();
            await example3_checkBalance();
            await example4_checkTokenBalance();
            await example5_multipleWallets();
            await example6_multiChainBalances();
        } else {
            switch (exampleNum) {
                case '1':
                    await example1_generateWallet();
                    break;
                case '2':
                    await example2_importWallet();
                    break;
                case '3':
                    await example3_checkBalance();
                    break;
                case '4':
                    await example4_checkTokenBalance();
                    break;
                case '5':
                    await example5_multipleWallets();
                    break;
                case '6':
                    await example6_multiChainBalances();
                    break;
                default:
                    console.log('Invalid example number. Use 1-6 or "all"');
            }
        }
    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
}

if (require.main === module) {
    runExamples();
}

module.exports = {
    example1_generateWallet,
    example2_importWallet,
    example3_checkBalance,
    example4_checkTokenBalance,
    example5_multipleWallets,
    example6_multiChainBalances
};
