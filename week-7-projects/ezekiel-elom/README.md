# Week 7: Token Factory Smart Contract


## ** Project Task: Token Factory Smart Contract**  
This project is about building a **Token Factory** that allows users to deploy their own ERC-20 tokens with a custom name, symbol, and total supply. The factory contract enables the creation of multiple token instances efficiently while keeping track of all deployed tokens.  



## **⚙️ Implementation**  

### **1️⃣ How the Factory Contract Works**  
The `TokenFactory` contract allows users to create ERC-20 tokens dynamically without writing a separate contract for each token. It provides:  
✅ **Token Deployment**: Users call `createToken(name, symbol, totalSupply)`, and the factory deploys a new ERC-20 token.  
✅ **Token Ownership**: The entire token supply is assigned to the creator.  
✅ **Tracking Tokens**: The factory stores a list of all deployed tokens for easy retrieval.  
✅ **Event Emission**: An event `TokenCreated` is emitted to log each new token deployment.  



### **2️⃣ How It Deploys Tokens**  
- The factory contract instantiates a new `CustomToken` contract each time `createToken()` is called.  
- The newly created token’s address is stored in an array, allowing anyone to track all deployed tokens.  



### **3️⃣ How the Frontend Interacts with the Contract**  
The frontend will allow users to:  
🔹 **Connect Wallet** (via Metamask using ethers.js).  
🔹 **Deploy a Token** by entering the name, symbol, and total supply.  
🔹 **View Deployed Tokens** with a list of contract addresses.  
🔹 **Track Events** to show real-time token creation.  



The frontend will use **ethers.js** to interact with the `TokenFactory` smart contract deployed on the blockchain.  

**Deployed Contract Link**

 [contract address](https://sepolia-explorer.metisdevops.link/address/0xa737184508875a3fC88d55c7a38D5E684515a101)
