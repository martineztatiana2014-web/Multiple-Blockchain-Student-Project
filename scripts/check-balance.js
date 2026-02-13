#!/usr/bin/env node
/**
 * Check native balance (ETH or BNB)
 */

const WalletManager = require('../wallet-config.js');
const chalk = require('chalk');

async function checkBalance() {
    const chain = process.argv[2] || 'eth';
    const network = process.env.NETWORK || 'testnet';

    console.log(chalk.blue.bold(`\n💰 Checking ${chain.toUpperCase()} Balance...\n`));

    const manager = new WalletManager();

    try {
        const wallet = manager.getConnectedWallet(chain, network);
        const address = wallet.address;

        console.log(chalk.white('Wallet Address:'), chalk.cyan(address));
        console.log(chalk.white('Network:'), chalk.yellow(network));
        console.log(chalk.white('Chain:'), chalk.yellow(chain.toUpperCase()));
        console.log();

        const balance = await manager.getBalance(address, chain, network);

        const currencySymbol = chain === 'eth' ? 'ETH' : 'BNB';
        console.log(chalk.green.bold(`Balance: ${balance} ${currencySymbol}`));
        console.log();

        if (parseFloat(balance) === 0) {
            console.log(chalk.yellow('⚠️  Your balance is 0. You need to add funds to this wallet.'));
            console.log();

            if (network === 'testnet') {
                console.log(chalk.blue('📌 Testnet Faucets:'));
                if (chain === 'eth') {
                    console.log(chalk.white('Sepolia Faucet: https://sepolia-faucet.pk910.de/'));
                    console.log(chalk.white('Alternative: https://www.alchemy.com/faucets/ethereum-sepolia'));
                } else if (chain === 'bsc') {
                    console.log(chalk.white('BSC Testnet Faucet: https://testnet.binance.org/faucet-smart'));
                }
                console.log();
            }
        }

    } catch (error) {
        console.error(chalk.red('❌ Error:'), error.message);
        process.exit(1);
    }
}

checkBalance();
