/**
 * Main entry point for the Token Developer Suite
 * Provides programmatic access to all features
 */

const WalletManager = require('./wallet-config');

// Export all functionality
module.exports = {
    WalletManager,

    // Convenience exports
    createWallet: () => {
        const manager = new WalletManager();
        return manager.generateNewWallet();
    },

    importWalletFromPrivateKey: (privateKey) => {
        const manager = new WalletManager();
        return manager.createWalletFromPrivateKey(privateKey);
    },

    importWalletFromMnemonic: (mnemonic, index = 0) => {
        const manager = new WalletManager();
        return manager.createWalletFromMnemonic(mnemonic, index);
    },

    getBalance: async (address, chain = 'eth', network = 'testnet') => {
        const manager = new WalletManager();
        return await manager.getBalance(address, chain, network);
    },

    getTokenBalance: async (walletAddress, tokenAddress, chain = 'eth', network = 'testnet') => {
        const manager = new WalletManager();
        return await manager.getTokenBalance(walletAddress, tokenAddress, chain, network);
    }
};

// If run directly, show help
if (require.main === module) {
    const chalk = require('chalk');

    console.log(chalk.blue.bold('\n🚀 Crypto Token Developer Suite\n'));
    console.log(chalk.white('Available Commands:\n'));

    console.log(chalk.cyan('Wallet Management:'));
    console.log(chalk.gray('  npm run generate:wallet       - Create new wallet'));
    console.log();

    console.log(chalk.cyan('Balance Checking:'));
    console.log(chalk.gray('  npm run check:balance:eth     - Check ETH balance'));
    console.log(chalk.gray('  npm run check:balance:bsc     - Check BNB balance'));
    console.log(chalk.gray('  npm run check:tokens:eth      - Check ERC20 tokens'));
    console.log(chalk.gray('  npm run check:tokens:bsc      - Check BEP20 tokens'));
    console.log();

    console.log(chalk.cyan('Token Retrieval:'));
    console.log(chalk.gray('  npm run retrieve:tokens eth   - Scan all ETH tokens'));
    console.log(chalk.gray('  npm run retrieve:tokens bsc   - Scan all BSC tokens'));
    console.log();

    console.log(chalk.cyan('Token Transfer:'));
    console.log(chalk.gray('  npm run transfer:token        - Transfer tokens'));
    console.log();

    console.log(chalk.cyan('Token Deployment:'));
    console.log(chalk.gray('  npm run deploy:token          - Deploy new token'));
    console.log();

    console.log(chalk.yellow('📖 For detailed instructions, see SETUP_GUIDE.md\n'));
    console.log(chalk.white('Quick Start:'));
    console.log(chalk.gray('  1. npm install'));
    console.log(chalk.gray('  2. cp .env.example .env'));
    console.log(chalk.gray('  3. npm run generate:wallet'));
    console.log(chalk.gray('  4. Add your keys to .env'));
    console.log(chalk.gray('  5. npm run check:balance:eth\n'));
}
