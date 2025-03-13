
# **Grant Management Smart Contract**  

## **Contract Address**  
- **Network:** Metis Sepolia Testnet  
- **Contract Address:** `0x566a5084D3dD7c5eefC0ACC61A5082A15596f0A4`  

## **Overview**  
This smart contract allows an owner to create and manage grants for beneficiaries. A grant is time-locked, meaning the beneficiary can only claim the funds after a set unlock time. The contract also allows the owner to revoke grants before the unlock time.  

## **Features**  
- The **owner** can create a grant for a beneficiary with an unlock time.  
- The **beneficiary** can claim the grant after the unlock time.  
- The **owner** can revoke the grant before the unlock time.  
- Functions to check the total balance in the contract and time left for a grant.  

## **Deployment Steps**  

### **Step 1: Clone the Repository**  
```bash
git clone <repository_url>
cd <repository_name>
```

### **Step 2: Install Dependencies**  
```bash
npm install
```

### **Step 3: Configure Environment Variables**  
Create a `.env` file and add the following:  
```plaintext
PRIVATE_KEY=your_wallet_private_key
METIS_SEPOLIA_RPC_URL=https://sepolia.metis.io
METISSCAN_API_KEY=your_explorer_api_key  # Only if using Hardhat verification
```

### **Step 4: Compile the Contract**  
```bash
npx hardhat compile
```

### **Step 5: Deploy the Contract (Using Hardhat Ignition)**  
```bash
npx hardhat ignition deploy --network metisSepolia
```

### **Step 6: Verify the Contract (Optional)**
```bash
npx hardhat verify --network metisSepolia 0xYourDeployedContractAddress
```

## **How It Works**  
1. The **owner** calls `createGrant(address beneficiary, uint unlockTime)` to set up a grant.  
2. The **beneficiary** waits until the unlock time and calls `claimGrant()` to withdraw funds.  
3. The **owner** can call `revokeGrant(address beneficiary)` to cancel the grant before the unlock time.  
4. `getGrantInfo(address beneficiary)` returns grant details.  
5. `getTotalContractBalance()` shows the total Ether stored in the contract.  
6. `getTimeLeft(address beneficiary)` returns the remaining time before funds are claimable.  

