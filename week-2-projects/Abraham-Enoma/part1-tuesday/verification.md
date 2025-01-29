# Smart Contract Verification on Metis

## Introduction
This guide explains how to verify smart contracts deployed via Hardhat on the Metis blockchain.

## Prerequisites
- Node.js installed
- Hardhat installed
- Metis Etherscan API key
- Private key for deployment

## Steps to Verify a Smart Contract

### 1. Set Up Your Hardhat Project
```bash
mkdir my-project
cd my-project
npm init -y
npm install --save-dev hardhat
npx hardhat
```
Select "Create a basic sample project" when prompted.

### 2. Install Necessary Plugins
```bash
npm install --save-dev @nomiclabs/hardhat-etherscan dotenv
```

### 3. Configure `hardhat.config.js`
Add the following configurations:
```javascript
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    metis: {
      url: "https://andromeda.metis.io/?owner=1088",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.METIS_ETHERSCAN_API_KEY,
  },
};
```
Ensure `.env` contains:
```
PRIVATE_KEY=your_private_key
METIS_ETHERSCAN_API_KEY=your_api_key
```

### 4. Deploy Your Contract
Create `scripts/deploy.js`:
```javascript
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Contract = await ethers.getContractFactory("YourContract");
  const contract = await Contract.deploy();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```
Run:
```bash
npx hardhat run scripts/deploy.js --network metis
```

### 5. Verify Your Contract
Run the verification command:
```bash
npx hardhat verify --network metis DEPLOYED_CONTRACT_ADDRESS
```
For contracts with constructor arguments:
```bash
npx hardhat verify --network metis DEPLOYED_CONTRACT_ADDRESS "arg1" "arg2"
```

### 6. Reference
For more details, refer to the official Metis GitHub: [Metis Hardhat Deployment](https://github.com/metis-edu/Deploy-Smart-Contract-Hardhat)

---
This guide helps ensure your smart contracts are successfully verified on Metis using Hardhat.

