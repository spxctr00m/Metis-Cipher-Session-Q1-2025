# Week 5 Tasks

## 📜 Deployment Documentation for Our Ether-Based Grant Contract (Metis Sepolia)**  

After development, I **deployed and verified** the contract on the **Metis Sepolia testnet**. ✅  

## What I Built
The **GrantContract** allows:  
✅ The **owner** to create a grant for a beneficiary with a release time.  
✅ The **beneficiary** to claim the grant when the time elapses.  
✅ The **owner** to **revert the grant** before the release time and get the funds back.  
✅ Users to **check grant details, time left, and total contract balance**.  

This ensures **trustless disbursement of funds** using Solidity’s built-in **block.timestamp** for time-based constraints.  


## The Deployment Setup (Metis Sepolia)

I deployed using **Hardhat Ignition**.  

### **1️⃣ Prerequisites**  

Before deployment, I ensured:  
- I had **Hardhat & Ignition installed**:  

  ```
  npm install --save-dev hardhat @nomicfoundation/hardhat-ignition
  ```

 **I Configured Hardhat for the Metis Sepolia testnet** in `hardhat.config.js`:  

  ```
  *(I used MetisSerpolia RPC key and Metamask private key for deployment.)*  
```

I added it to an env to prevent unncessary access 


### ** Compiling Our Contract**  
Before deploying, I compiled the contract to check for errors:  

```bash
npx hardhat compile
```
✅ **Compilation successful** (No errors or warnings).  


### ** Writing Our Deployment Module**  
We created a deployment module in **`ignition/modules/`**:  
📌 **`ignition/modules/GrantContract.js`**  


This tells Hardhat Ignition to deploy  **GrantContract** with no constructor parameters.


### **Deploying the Contract on Metis Sepolia**  
To deploy the contract, I ran:  

```bash
npx hardhat ignition deploy ignition/modules/GrantContract.js --network metisSepolia
```
**Deployment Successful!**  


🔹 **Deployed Contract Address**: `0xd7AfC5598D1681Da001d4BD10cab26bA20a59A22` *(I noted this for verification & interaction).*



