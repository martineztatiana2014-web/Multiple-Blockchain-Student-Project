#!/usr/bin/env node

/**
 * API Key Setup Helper
 * 
 * This interactive script helps you configure API keys for:
 * - Ethereum (Infura)
 * - Starknet (Infura)
 * - Etherscan (Optional)
 * - BSCScan (Optional)
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function print(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function printHeader(title) {
  console.log('\n' + '='.repeat(60));
  print(title, 'bright');
  console.log('='.repeat(60) + '\n');
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupAPIKeys() {
  printHeader('🔑 API Key Setup Wizard');
  
  print('This wizard will help you configure your API keys for:', 'cyan');
  print('  • Ethereum (via Infura)', 'blue');
  print('  • Starknet (via Infura)', 'blue');
  print('  • Block Explorers (Etherscan, BSCScan)', 'blue');
  console.log('');

  // Check if .env already exists
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  let existingEnv = {};
  if (fs.existsSync(envPath)) {
    print('⚠️  Found existing .env file!', 'yellow');
    const backup = await question('Do you want to backup your current .env? (yes/no): ');
    
    if (backup.toLowerCase() === 'yes' || backup.toLowerCase() === 'y') {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(process.cwd(), `.env.backup.${timestamp}`);
      fs.copyFileSync(envPath, backupPath);
      print(`✅ Backed up to: ${backupPath}`, 'green');
    }
    
    // Parse existing .env
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && !key.startsWith('#')) {
        existingEnv[key.trim()] = valueParts.join('=').trim();
      }
    });
  } else if (!fs.existsSync(envExamplePath)) {
    print('❌ Error: .env.example file not found!', 'red');
    print('Please make sure you are in the correct directory.', 'red');
    process.exit(1);
  }

  console.log('');
  
  // Gather API keys
  const config = {};

  // Step 1: Infura API Key
  printHeader('Step 1: Infura API Key (Required)');
  print('Infura provides RPC endpoints for both Ethereum and Starknet.', 'cyan');
  print('Sign up at: https://infura.io (Free tier available)', 'blue');
  console.log('');
  
  const currentInfura = extractInfuraKey(existingEnv.ETHEREUM_RPC_URL);
  if (currentInfura && currentInfura !== 'YOUR_INFURA_API_KEY') {
    print(`Current Infura API Key: ${currentInfura.substring(0, 8)}...`, 'yellow');
    const keepInfura = await question('Keep this key? (yes/no): ');
    if (keepInfura.toLowerCase() === 'yes' || keepInfura.toLowerCase() === 'y') {
      config.infuraApiKey = currentInfura;
    }
  }
  
  if (!config.infuraApiKey) {
    config.infuraApiKey = await question('Enter your Infura API Key (Project ID): ');
    if (!config.infuraApiKey || config.infuraApiKey.trim() === '') {
      print('⚠️  No Infura API key provided. Using placeholder.', 'yellow');
      config.infuraApiKey = 'YOUR_INFURA_API_KEY';
    }
  }

  // Step 2: Etherscan API Key
  printHeader('Step 2: Etherscan API Key (Optional)');
  print('Used for contract verification and transaction history.', 'cyan');
  print('Get free key at: https://etherscan.io/apis', 'blue');
  console.log('');
  
  const currentEtherscan = existingEnv.ETHERSCAN_API_KEY;
  if (currentEtherscan && currentEtherscan !== 'your_etherscan_api_key') {
    print(`Current Etherscan API Key: ${currentEtherscan.substring(0, 8)}...`, 'yellow');
    const keepEtherscan = await question('Keep this key? (yes/no): ');
    if (keepEtherscan.toLowerCase() === 'yes' || keepEtherscan.toLowerCase() === 'y') {
      config.etherscanApiKey = currentEtherscan;
    }
  }
  
  if (!config.etherscanApiKey) {
    config.etherscanApiKey = await question('Enter Etherscan API Key (or press Enter to skip): ');
    if (!config.etherscanApiKey || config.etherscanApiKey.trim() === '') {
      config.etherscanApiKey = 'your_etherscan_api_key';
    }
  }

  // Step 3: BSCScan API Key
  printHeader('Step 3: BSCScan API Key (Optional)');
  print('Used for BSC contract verification.', 'cyan');
  print('Get free key at: https://bscscan.com/apis', 'blue');
  console.log('');
  
  const currentBscscan = existingEnv.BSCSCAN_API_KEY;
  if (currentBscscan && currentBscscan !== 'your_bscscan_api_key') {
    print(`Current BSCScan API Key: ${currentBscscan.substring(0, 8)}...`, 'yellow');
    const keepBscscan = await question('Keep this key? (yes/no): ');
    if (keepBscscan.toLowerCase() === 'yes' || keepBscscan.toLowerCase() === 'y') {
      config.bscscanApiKey = currentBscscan;
    }
  }
  
  if (!config.bscscanApiKey) {
    config.bscscanApiKey = await question('Enter BSCScan API Key (or press Enter to skip): ');
    if (!config.bscscanApiKey || config.bscscanApiKey.trim() === '') {
      config.bscscanApiKey = 'your_bscscan_api_key';
    }
  }

  // Step 4: Network Selection
  printHeader('Step 4: Network Configuration');
  print('Select default network:', 'cyan');
  print('  1. testnet (recommended for development)', 'blue');
  print('  2. mainnet (production only)', 'blue');
  console.log('');
  
  const networkChoice = await question('Choose network (1 or 2) [default: 1]: ');
  config.network = (networkChoice === '2') ? 'mainnet' : 'testnet';

  // Generate .env content
  printHeader('Generating Configuration...');
  
  const envContent = generateEnvContent(config, existingEnv);
  
  // Write to .env
  fs.writeFileSync(envPath, envContent);
  
  print('✅ Configuration saved to .env', 'green');
  console.log('');

  // Validate the configuration
  await validateConfiguration(config);
  
  printHeader('🎉 Setup Complete!');
  print('Your API keys have been configured.', 'green');
  console.log('');
  print('Next steps:', 'cyan');
  print('  1. Review your .env file', 'blue');
  print('  2. Add your wallet private key (if needed)', 'blue');
  print('  3. Test connection: npm run check:balance:eth', 'blue');
  print('  4. Read API_KEY_GUIDE.md for more information', 'blue');
  console.log('');
  print('⚠️  Security Reminder:', 'yellow');
  print('  • Never commit .env to Git', 'yellow');
  print('  • Keep your private keys secure', 'yellow');
  print('  • Use testnet for development', 'yellow');
  console.log('');
  
  rl.close();
}

function extractInfuraKey(url) {
  if (!url) return null;
  const match = url.match(/\/v3\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

function generateEnvContent(config, existingEnv) {
  const infuraKey = config.infuraApiKey;
  
  return `# API Keys for Blockchain Networks
# Generated on: ${new Date().toISOString()}

# Ethereum/Binance Smart Chain RPC URLs
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/${infuraKey}
ETHEREUM_TESTNET_RPC_URL=https://sepolia.infura.io/v3/${infuraKey}
BSC_RPC_URL=https://bsc-dataseed.binance.org/
BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/

# Starknet RPC URLs
STARKNET_RPC_URL=https://starknet-mainnet.infura.io/v3/${infuraKey}
STARKNET_TESTNET_RPC_URL=https://starknet-goerli.infura.io/v3/${infuraKey}

# Private Keys (NEVER commit the actual .env file with real keys!)
PRIVATE_KEY=${existingEnv.PRIVATE_KEY || 'your_private_key_here'}
MNEMONIC=${existingEnv.MNEMONIC || 'your twelve word seed phrase here'}

# Block Explorer API Keys (for contract verification)
ETHERSCAN_API_KEY=${config.etherscanApiKey}
BSCSCAN_API_KEY=${config.bscscanApiKey}

# Wallet Addresses (PUBLIC - safe to share for receiving funds)
WALLET_ADDRESS_ETH=${existingEnv.WALLET_ADDRESS_ETH || '0x...'}
WALLET_ADDRESS_BTC=${existingEnv.WALLET_ADDRESS_BTC || '...'}
WALLET_ADDRESS_STARKNET=${existingEnv.WALLET_ADDRESS_STARKNET || '0x...'}

# Token Contract Addresses (after deployment)
TOKEN_CONTRACT_ADDRESS=${existingEnv.TOKEN_CONTRACT_ADDRESS || ''}

# Network Configuration
NETWORK=${config.network}
`;
}

async function validateConfiguration(config) {
  print('Validating configuration...', 'cyan');
  
  // Check if Infura key looks valid (32 chars alphanumeric)
  if (config.infuraApiKey !== 'YOUR_INFURA_API_KEY') {
    if (config.infuraApiKey.length === 32 && /^[a-zA-Z0-9]+$/.test(config.infuraApiKey)) {
      print('  ✅ Infura API key format looks good', 'green');
    } else {
      print('  ⚠️  Infura API key format may be invalid (expected 32 alphanumeric chars)', 'yellow');
    }
  } else {
    print('  ⚠️  Infura API key not set (using placeholder)', 'yellow');
  }
  
  // Check Etherscan key
  if (config.etherscanApiKey !== 'your_etherscan_api_key') {
    if (config.etherscanApiKey.length > 20) {
      print('  ✅ Etherscan API key configured', 'green');
    } else {
      print('  ⚠️  Etherscan API key may be too short', 'yellow');
    }
  } else {
    print('  ℹ️  Etherscan API key not configured (optional)', 'blue');
  }
  
  // Check BSCScan key
  if (config.bscscanApiKey !== 'your_bscscan_api_key') {
    if (config.bscscanApiKey.length > 20) {
      print('  ✅ BSCScan API key configured', 'green');
    } else {
      print('  ⚠️  BSCScan API key may be too short', 'yellow');
    }
  } else {
    print('  ℹ️  BSCScan API key not configured (optional)', 'blue');
  }
  
  print(`  ✅ Network set to: ${config.network}`, 'green');
  console.log('');
}

// Main execution
if (require.main === module) {
  setupAPIKeys().catch(error => {
    print('❌ Error during setup:', 'red');
    console.error(error);
    rl.close();
    process.exit(1);
  });
}

module.exports = { setupAPIKeys };
