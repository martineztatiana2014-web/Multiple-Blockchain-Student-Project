#!/usr/bin/env node
/**
 * Check ERC20 token balances for a wallet
 */

const WalletManager = require('../wallet-config.js');
const chalk = require('chalk');
const axios = require('axios');

/**
 * Popular token contracts for quick checking
 */
const KNOWN_TOKENS = {
    eth: {
        mainnet: [
            { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', name: 'Tether USD' },
            { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', name: 'USD Coin' },
            { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f', name: 'Dai Stablecoin' },
            { symbol: 'LINK', address: '0x514910771af9ca656af840dff83e8264ecf986ca', name: 'ChainLink Token' },
            { symbol: 'UNI', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', name: 'Uniswap' }
        ],
        testnet: []
    },
    bsc: {
        mainnet: [
            { symbol: 'USDT', address: '0x55d398326f99059ff775485246999027b3197955', name: 'Tether USD' },
            { symbol: 'USDC', address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', name: 'USD Coin' },
            { symbol: 'BUSD', address: '0xe9e7cea3dedca5984780bafc599bd69add087d56', name: 'Binance USD' },
            { symbol: 'CAKE', address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', name: 'PancakeSwap Token' }
        ],
        testnet: []
    }
};

async function checkTokens() {
    const chain = process.argv[2] || 'eth';
    const network = process.env.NETWORK || 'testnet';
    const customTokenAddress = process.argv[3];

    console.log(chalk.blue.bold(`\n🪙 Checking Token Balances...\n`));

    const manager = new WalletManager();

    try {
        const wallet = manager.getConnectedWallet(chain, network);
        const address = wallet.address;

        console.log(chalk.white('Wallet Address:'), chalk.cyan(address));
        console.log(chalk.white('Network:'), chalk.yellow(network));
        console.log(chalk.white('Chain:'), chalk.yellow(chain.toUpperCase()));
        console.log();

        let tokensToCheck = [];

        // If custom token address provided, check only that
        if (customTokenAddress) {
            console.log(chalk.blue('Checking custom token address...\n'));
            tokensToCheck = [{ address: customTokenAddress, symbol: 'CUSTOM' }];
        } else {
            // Check known tokens
            tokensToCheck = KNOWN_TOKENS[chain]?.[network] || [];

            if (tokensToCheck.length === 0) {
                console.log(chalk.yellow('No known tokens configured for this network.'));
                console.log(chalk.white('Usage: npm run check:tokens:eth -- <token_contract_address>\n'));
                return;
            }
        }

        console.log(chalk.blue.bold('Token Balances:\n'));

        let foundBalance = false;

        for (const token of tokensToCheck) {
            try {
                const tokenInfo = await manager.getTokenBalance(
                    address,
                    token.address,
                    chain,
                    network
                );

                const balance = parseFloat(tokenInfo.formattedBalance);

                if (balance > 0 || customTokenAddress) {
                    foundBalance = true;
                    console.log(chalk.green('✅'), chalk.white.bold(tokenInfo.symbol));
                    console.log(chalk.white('   Name:'), tokenInfo.name);
                    console.log(chalk.white('   Balance:'), chalk.cyan(tokenInfo.formattedBalance));
                    console.log(chalk.white('   Contract:'), chalk.gray(tokenInfo.tokenAddress));
                    console.log();
                }
            } catch (error) {
                if (customTokenAddress) {
                    console.log(chalk.red('❌ Error reading token:'), error.message);
                }
            }
        }

        if (!foundBalance && !customTokenAddress) {
            console.log(chalk.yellow('No token balances found for known tokens.'));
            console.log(chalk.white('\n💡 To check a specific token:'));
            console.log(chalk.gray(`npm run check:tokens:${chain} -- <token_contract_address>\n`));
        }

    } catch (error) {
        console.error(chalk.red('❌ Error:'), error.message);
        process.exit(1);
    }
}

checkTokens();
