#!/usr/bin/env node
/**
 * Retrieve all tokens from a wallet - shows comprehensive token holdings
 */

const WalletManager = require('../wallet-config.js');
const chalk = require('chalk');
const axios = require('axios');

/**
 * Get all ERC20 token transfers for an address using Etherscan/BSCScan API
 */
async function getTokenListFromAPI(address, chain, network) {
    try {
        let apiUrl, apiKey;

        if (chain === 'eth') {
            apiKey = process.env.ETHERSCAN_API_KEY;
            if (network === 'mainnet') {
                apiUrl = 'https://api.etherscan.io/api';
            } else {
                apiUrl = 'https://api-sepolia.etherscan.io/api';
            }
        } else if (chain === 'bsc') {
            apiKey = process.env.BSCSCAN_API_KEY;
            if (network === 'mainnet') {
                apiUrl = 'https://api.bscscan.com/api';
            } else {
                apiUrl = 'https://api-testnet.bscscan.com/api';
            }
        }

        if (!apiKey || apiKey === 'your_etherscan_api_key' || apiKey === 'your_bscscan_api_key') {
            return null;
        }

        const response = await axios.get(apiUrl, {
            params: {
                module: 'account',
                action: 'tokentx',
                address: address,
                startblock: 0,
                endblock: 99999999,
                sort: 'asc',
                apikey: apiKey
            }
        });

        if (response.data.status === '1') {
            // Get unique token contracts
            const uniqueTokens = new Map();
            response.data.result.forEach(tx => {
                if (!uniqueTokens.has(tx.contractAddress)) {
                    uniqueTokens.set(tx.contractAddress, {
                        address: tx.contractAddress,
                        symbol: tx.tokenSymbol,
                        name: tx.tokenName,
                        decimals: tx.tokenDecimal
                    });
                }
            });
            return Array.from(uniqueTokens.values());
        }

        return null;
    } catch (error) {
        return null;
    }
}

async function retrieveTokens() {
    const chain = process.argv[2] || 'eth';
    const network = process.env.NETWORK || 'testnet';

    console.log(chalk.blue.bold(`\n🔍 Retrieving All Tokens for Your Wallet...\n`));

    const manager = new WalletManager();

    try {
        const wallet = manager.getConnectedWallet(chain, network);
        const address = wallet.address;

        console.log(chalk.white('Wallet Address:'), chalk.cyan(address));
        console.log(chalk.white('Network:'), chalk.yellow(network));
        console.log(chalk.white('Chain:'), chalk.yellow(chain.toUpperCase()));
        console.log();

        // Check native balance first
        console.log(chalk.blue.bold('Native Currency:\n'));
        const nativeBalance = await manager.getBalance(address, chain, network);
        const currencySymbol = chain === 'eth' ? 'ETH' : 'BNB';
        console.log(chalk.green('✅'), chalk.white.bold(currencySymbol));
        console.log(chalk.white('   Balance:'), chalk.cyan(`${nativeBalance} ${currencySymbol}`));
        console.log();

        // Try to get token list from API
        console.log(chalk.blue.bold('ERC20 Tokens:\n'));
        console.log(chalk.blue('Scanning for tokens...'));

        const tokenList = await getTokenListFromAPI(address, chain, network);

        if (tokenList && tokenList.length > 0) {
            console.log(chalk.green(`Found ${tokenList.length} token(s) with transaction history\n`));

            let tokensWithBalance = 0;

            for (const token of tokenList) {
                try {
                    const tokenInfo = await manager.getTokenBalance(
                        address,
                        token.address,
                        chain,
                        network
                    );

                    const balance = parseFloat(tokenInfo.formattedBalance);

                    if (balance > 0) {
                        tokensWithBalance++;
                        console.log(chalk.green('✅'), chalk.white.bold(tokenInfo.symbol));
                        console.log(chalk.white('   Name:'), tokenInfo.name);
                        console.log(chalk.white('   Balance:'), chalk.cyan(tokenInfo.formattedBalance));
                        console.log(chalk.white('   Contract:'), chalk.gray(tokenInfo.tokenAddress));
                        console.log();
                    }
                } catch (error) {
                    // Skip tokens that fail to load
                }
            }

            if (tokensWithBalance === 0) {
                console.log(chalk.yellow('No tokens with balance found.'));
            }
        } else {
            console.log(chalk.yellow('⚠️  Cannot retrieve token list automatically.'));
            console.log();
            console.log(chalk.white('Reasons:'));
            console.log(chalk.gray('  - No API key configured in .env'));
            console.log(chalk.gray('  - No token transactions found for this address'));
            console.log();
            console.log(chalk.white('💡 To check a specific token:'));
            console.log(chalk.gray(`  npm run check:tokens:${chain} -- <token_contract_address>`));
            console.log();
            console.log(chalk.white('To enable automatic scanning, add API key to .env:'));
            if (chain === 'eth') {
                console.log(chalk.gray('  ETHERSCAN_API_KEY=your_key_here'));
                console.log(chalk.gray('  Get key at: https://etherscan.io/apis'));
            } else if (chain === 'bsc') {
                console.log(chalk.gray('  BSCSCAN_API_KEY=your_key_here'));
                console.log(chalk.gray('  Get key at: https://bscscan.com/apis'));
            }
        }

        console.log();

    } catch (error) {
        console.error(chalk.red('❌ Error:'), error.message);
        process.exit(1);
    }
}

retrieveTokens();
