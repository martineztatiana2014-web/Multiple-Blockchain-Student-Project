const { ethers } = require('ethers');
require('dotenv').config();

/**
 * Wallet Manager for Ethereum, BSC, and other EVM-compatible chains
 */
class WalletManager {
    constructor() {
        this.networks = {
            eth: {
                name: 'Ethereum',
                mainnet: process.env.ETHEREUM_RPC_URL,
                testnet: process.env.ETHEREUM_TESTNET_RPC_URL,
                chainId: process.env.NETWORK === 'mainnet' ? 1 : 11155111
            },
            bsc: {
                name: 'Binance Smart Chain',
                mainnet: process.env.BSC_RPC_URL,
                testnet: process.env.BSC_TESTNET_RPC_URL,
                chainId: process.env.NETWORK === 'mainnet' ? 56 : 97
            }
        };
    }

    /**
     * Generate a new random wallet
     * @returns {Object} Wallet object with address, privateKey, and mnemonic
     */
    generateNewWallet() {
        const wallet = ethers.Wallet.createRandom();

        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase,
            wallet: wallet
        };
    }

    /**
     * Create wallet from private key
     * @param {string} privateKey - The private key
     * @returns {Object} Wallet object
     */
    createWalletFromPrivateKey(privateKey) {
        const wallet = new ethers.Wallet(privateKey);

        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
            wallet: wallet
        };
    }

    /**
     * Create wallet from mnemonic phrase
     * @param {string} mnemonic - The mnemonic seed phrase
     * @param {number} index - Derivation path index (default: 0)
     * @returns {Object} Wallet object
     */
    createWalletFromMnemonic(mnemonic, index = 0) {
        const wallet = ethers.Wallet.fromPhrase(mnemonic, `m/44'/60'/0'/0/${index}`);

        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: mnemonic,
            wallet: wallet
        };
    }

    /**
     * Get Ethereum provider
     * @param {string} network - 'mainnet' or 'testnet'
     * @returns {ethers.Provider} Provider instance
     */
    getEthereumProvider(network = 'testnet') {
        const rpcUrl = network === 'mainnet'
            ? this.networks.eth.mainnet
            : this.networks.eth.testnet;

        return new ethers.JsonRpcProvider(rpcUrl);
    }

    /**
     * Get BSC provider
     * @param {string} network - 'mainnet' or 'testnet'
     * @returns {ethers.Provider} Provider instance
     */
    getBSCProvider(network = 'testnet') {
        const rpcUrl = network === 'mainnet'
            ? this.networks.bsc.mainnet
            : this.networks.bsc.testnet;

        return new ethers.JsonRpcProvider(rpcUrl);
    }

    /**
     * Get wallet connected to a provider
     * @param {string} chain - 'eth' or 'bsc'
     * @param {string} network - 'mainnet' or 'testnet'
     * @returns {ethers.Wallet} Connected wallet
     */
    getConnectedWallet(chain = 'eth', network = 'testnet') {
        const privateKey = process.env.PRIVATE_KEY;

        if (!privateKey || privateKey === 'your_private_key_here') {
            throw new Error('Please set PRIVATE_KEY in .env file');
        }

        const provider = chain === 'eth'
            ? this.getEthereumProvider(network)
            : this.getBSCProvider(network);

        return new ethers.Wallet(privateKey, provider);
    }

    /**
     * Check native balance (ETH or BNB)
     * @param {string} address - Wallet address
     * @param {string} chain - 'eth' or 'bsc'
     * @param {string} network - 'mainnet' or 'testnet'
     * @returns {Promise<string>} Balance in ether format
     */
    async getBalance(address, chain = 'eth', network = 'testnet') {
        const provider = chain === 'eth'
            ? this.getEthereumProvider(network)
            : this.getBSCProvider(network);

        const balance = await provider.getBalance(address);
        return ethers.formatEther(balance);
    }

    /**
     * Get ERC20 token balance
     * @param {string} walletAddress - Wallet address
     * @param {string} tokenAddress - Token contract address
     * @param {string} chain - 'eth' or 'bsc'
     * @param {string} network - 'mainnet' or 'testnet'
     * @returns {Promise<Object>} Token balance info
     */
    async getTokenBalance(walletAddress, tokenAddress, chain = 'eth', network = 'testnet') {
        const provider = chain === 'eth'
            ? this.getEthereumProvider(network)
            : this.getBSCProvider(network);

        // ERC20 ABI for balanceOf, decimals, symbol, name
        const erc20Abi = [
            'function balanceOf(address owner) view returns (uint256)',
            'function decimals() view returns (uint8)',
            'function symbol() view returns (string)',
            'function name() view returns (string)'
        ];

        const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);

        try {
            const [balance, decimals, symbol, name] = await Promise.all([
                tokenContract.balanceOf(walletAddress),
                tokenContract.decimals(),
                tokenContract.symbol(),
                tokenContract.name()
            ]);

            const formattedBalance = ethers.formatUnits(balance, decimals);

            return {
                balance: balance.toString(),
                formattedBalance: formattedBalance,
                decimals: decimals,
                symbol: symbol,
                name: name,
                tokenAddress: tokenAddress
            };
        } catch (error) {
            throw new Error(`Failed to get token balance: ${error.message}`);
        }
    }
}

module.exports = WalletManager;
