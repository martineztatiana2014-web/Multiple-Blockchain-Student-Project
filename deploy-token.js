#!/usr/bin/env node
/**
 * Deploy an ERC20 token contract
 */

const { ethers } = require('ethers');
const WalletManager = require('./wallet-config.js');
const chalk = require('chalk');

// Simple ERC20 Token Contract
const TOKEN_CONTRACT_SOURCE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleERC20Token {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Insufficient allowance");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
`;

// Compiled bytecode (you would typically get this from Solidity compiler)
const TOKEN_ABI = [
    "constructor(string memory _name, string memory _symbol, uint256 _initialSupply)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address account) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

async function deployToken() {
    console.log(chalk.blue.bold('\n🚀 Token Deployment Tool\n'));

    const args = process.argv.slice(2);

    if (args.length < 4) {
        console.log(chalk.white('Usage:'));
        console.log(chalk.gray('  npm run deploy:token -- <chain> <name> <symbol> <initialSupply>\n'));
        console.log(chalk.white('Examples:'));
        console.log(chalk.gray('  npm run deploy:token -- eth "My Token" "MTK" 1000000'));
        console.log(chalk.gray('  npm run deploy:token -- bsc "BNB Token" "BNBT" 500000\n'));

        console.log(chalk.yellow('⚠️  Note: You need to compile the contract first or use a pre-compiled bytecode.'));
        console.log(chalk.white('This script shows the deployment structure. For actual deployment:'));
        console.log(chalk.gray('  1. Use Remix IDE (https://remix.ethereum.org)'));
        console.log(chalk.gray('  2. Use Hardhat or Truffle framework'));
        console.log(chalk.gray('  3. Or provide compiled bytecode\n'));
        process.exit(0);
    }

    const [chain, tokenName, tokenSymbol, initialSupply] = args;
    const network = process.env.NETWORK || 'testnet';

    console.log(chalk.blue('Contract Source Code:'));
    console.log(chalk.gray('```solidity'));
    console.log(chalk.gray(TOKEN_CONTRACT_SOURCE));
    console.log(chalk.gray('```\n'));

    console.log(chalk.yellow('📝 Deployment Instructions:\n'));

    console.log(chalk.white.bold('Method 1: Using Remix IDE (Recommended for beginners)'));
    console.log(chalk.gray('  1. Visit https://remix.ethereum.org'));
    console.log(chalk.gray('  2. Create a new file: SimpleERC20Token.sol'));
    console.log(chalk.gray('  3. Copy the contract source code above'));
    console.log(chalk.gray('  4. Compile the contract (Ctrl+S)'));
    console.log(chalk.gray('  5. Deploy using "Injected Provider - MetaMask"'));
    console.log(chalk.gray(`  6. Constructor parameters:`));
    console.log(chalk.cyan(`     - name: "${tokenName}"`));
    console.log(chalk.cyan(`     - symbol: "${tokenSymbol}"`));
    console.log(chalk.cyan(`     - initialSupply: ${initialSupply}`));
    console.log();

    console.log(chalk.white.bold('Method 2: Using Hardhat (For advanced users)'));
    console.log(chalk.gray('  1. npm install --save-dev hardhat'));
    console.log(chalk.gray('  2. npx hardhat init'));
    console.log(chalk.gray('  3. Create contract in contracts/ folder'));
    console.log(chalk.gray('  4. npx hardhat compile'));
    console.log(chalk.gray('  5. npx hardhat run scripts/deploy.js --network <network>'));
    console.log();

    console.log(chalk.white.bold('After Deployment:'));
    console.log(chalk.gray('  1. Save the contract address'));
    console.log(chalk.gray('  2. Add to .env file: TOKEN_CONTRACT_ADDRESS=0x...'));
    console.log(chalk.gray('  3. Use check-tokens.js to verify deployment'));
    console.log();

    console.log(chalk.blue('Deployment Configuration:'));
    console.log(chalk.white('  Chain:'), chalk.yellow(chain.toUpperCase()));
    console.log(chalk.white('  Network:'), chalk.yellow(network));
    console.log(chalk.white('  Token Name:'), chalk.cyan(tokenName));
    console.log(chalk.white('  Token Symbol:'), chalk.cyan(tokenSymbol));
    console.log(chalk.white('  Initial Supply:'), chalk.cyan(initialSupply));
    console.log();

    const manager = new WalletManager();
    const wallet = manager.getConnectedWallet(chain, network);

    console.log(chalk.white('  Deployer Address:'), chalk.cyan(wallet.address));

    const balance = await manager.getBalance(wallet.address, chain, network);
    const currencySymbol = chain === 'eth' ? 'ETH' : 'BNB';
    console.log(chalk.white('  Deployer Balance:'), chalk.cyan(`${balance} ${currencySymbol}`));
    console.log();

    if (parseFloat(balance) < 0.01) {
        console.log(chalk.red('⚠️  Warning: Low balance! You need gas to deploy the contract.'));
        console.log(chalk.yellow('Get testnet funds from faucets before deploying.\n'));
    }
}

deployToken();
