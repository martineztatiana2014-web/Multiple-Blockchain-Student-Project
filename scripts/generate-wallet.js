#!/usr/bin/env node
/**
 * Generate a new wallet for receiving tokens
 */

const WalletManager = require('../wallet-config.js');
const chalk = require('chalk');

function generateWallet() {
    console.log(chalk.blue.bold('\n🔐 Generating New Wallet...\n'));

    const manager = new WalletManager();
    const wallet = manager.generateNewWallet();

    console.log(chalk.green('✅ Wallet Created Successfully!\n'));
    console.log(chalk.yellow('⚠️  SAVE THIS INFORMATION IN A SECURE PLACE!\n'));

    console.log(chalk.white.bold('Public Address (Share this to receive funds):'));
    console.log(chalk.cyan(wallet.address));
    console.log();

    console.log(chalk.white.bold('Private Key (NEVER share this!):'));
    console.log(chalk.red(wallet.privateKey));
    console.log();

    console.log(chalk.white.bold('Mnemonic Seed Phrase (NEVER share this!):'));
    console.log(chalk.red(wallet.mnemonic));
    console.log();

    console.log(chalk.yellow('📝 Instructions:'));
    console.log(chalk.white('1. Copy your PRIVATE_KEY to the .env file'));
    console.log(chalk.white('2. Copy your WALLET_ADDRESS_ETH to the .env file'));
    console.log(chalk.white('3. Save your mnemonic phrase in a safe place'));
    console.log(chalk.white('4. Share only your public address to receive funds\n'));

    console.log(chalk.blue('.env format:'));
    console.log(chalk.gray(`PRIVATE_KEY=${wallet.privateKey}`));
    console.log(chalk.gray(`WALLET_ADDRESS_ETH=${wallet.address}\n`));
}

generateWallet();
