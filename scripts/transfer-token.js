#!/usr/bin/env node
/**
 * Retrieve/Transfer tokens from your wallet to another address
 */

const WalletManager = require('../wallet-config.js');
const { ethers } = require('ethers');
const chalk = require('chalk');

async function transferToken() {
    const args = process.argv.slice(2);

    if (args.length < 3) {
        console.log(chalk.yellow('\n📤 Token Transfer Tool\n'));
        console.log(chalk.white('Usage:'));
        console.log(chalk.gray('  npm run transfer:token -- <chain> <token_address> <recipient_address> <amount>\n'));
        console.log(chalk.white('Examples:'));
        console.log(chalk.gray('  npm run transfer:token -- eth 0x... 0x... 100'));
        console.log(chalk.gray('  npm run transfer:token -- bsc 0x... 0x... 50.5\n'));
        console.log(chalk.white('To transfer native currency (ETH/BNB), use "native" as token address\n'));
        process.exit(0);
    }

    const [chain, tokenAddress, recipientAddress, amount] = args;
    const network = process.env.NETWORK || 'testnet';

    console.log(chalk.blue.bold('\n📤 Initiating Token Transfer...\n'));

    const manager = new WalletManager();

    try {
        const wallet = manager.getConnectedWallet(chain, network);

        console.log(chalk.white('From:'), chalk.cyan(wallet.address));
        console.log(chalk.white('To:'), chalk.cyan(recipientAddress));
        console.log(chalk.white('Network:'), chalk.yellow(network));
        console.log(chalk.white('Chain:'), chalk.yellow(chain.toUpperCase()));
        console.log();

        let tx;

        // Transfer native currency (ETH/BNB)
        if (tokenAddress.toLowerCase() === 'native') {
            const currencySymbol = chain === 'eth' ? 'ETH' : 'BNB';
            console.log(chalk.white('Transferring:'), chalk.cyan(`${amount} ${currencySymbol}`));
            console.log();

            const txRequest = {
                to: recipientAddress,
                value: ethers.parseEther(amount)
            };

            console.log(chalk.blue('Sending transaction...'));
            tx = await wallet.sendTransaction(txRequest);

        } else {
            // Transfer ERC20 token
            const erc20Abi = [
                'function transfer(address to, uint256 amount) returns (bool)',
                'function decimals() view returns (uint8)',
                'function symbol() view returns (string)',
                'function balanceOf(address owner) view returns (uint256)'
            ];

            const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, wallet);

            // Get token info
            const [symbol, decimals, balance] = await Promise.all([
                tokenContract.symbol(),
                tokenContract.decimals(),
                tokenContract.balanceOf(wallet.address)
            ]);

            const amountInWei = ethers.parseUnits(amount, decimals);

            console.log(chalk.white('Token:'), chalk.cyan(symbol));
            console.log(chalk.white('Amount:'), chalk.cyan(`${amount} ${symbol}`));
            console.log(chalk.white('Your Balance:'), chalk.cyan(ethers.formatUnits(balance, decimals)));
            console.log();

            // Check if user has enough balance
            if (balance < amountInWei) {
                console.log(chalk.red('❌ Insufficient balance!'));
                process.exit(1);
            }

            console.log(chalk.blue('Sending transaction...'));
            tx = await tokenContract.transfer(recipientAddress, amountInWei);
        }

        console.log(chalk.white('Transaction Hash:'), chalk.gray(tx.hash));
        console.log(chalk.blue('Waiting for confirmation...'));

        const receipt = await tx.wait();

        console.log();
        console.log(chalk.green.bold('✅ Transfer Successful!'));
        console.log(chalk.white('Block Number:'), receipt.blockNumber);
        console.log(chalk.white('Gas Used:'), receipt.gasUsed.toString());
        console.log();

        // Show explorer link
        if (chain === 'eth') {
            const explorerUrl = network === 'mainnet'
                ? `https://etherscan.io/tx/${tx.hash}`
                : `https://sepolia.etherscan.io/tx/${tx.hash}`;
            console.log(chalk.blue('View on Explorer:'), chalk.cyan(explorerUrl));
        } else if (chain === 'bsc') {
            const explorerUrl = network === 'mainnet'
                ? `https://bscscan.com/tx/${tx.hash}`
                : `https://testnet.bscscan.com/tx/${tx.hash}`;
            console.log(chalk.blue('View on Explorer:'), chalk.cyan(explorerUrl));
        }
        console.log();

    } catch (error) {
        console.error(chalk.red('\n❌ Transfer Failed:'), error.message);
        if (error.reason) {
            console.error(chalk.red('Reason:'), error.reason);
        }
        process.exit(1);
    }
}

transferToken();
