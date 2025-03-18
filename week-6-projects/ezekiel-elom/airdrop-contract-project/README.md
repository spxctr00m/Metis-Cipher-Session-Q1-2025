# Week 6 - Test

## **🛠️ Implementation Details**  

### **1️⃣ ERC-20 Token (MyToken.sol)**
I created an ERC-20 token using **OpenZeppelin’s ERC20 implementation**:  

- The contract **inherits from ERC20**.
- In the constructor, I **mint an initial supply** to the deployer.
- The token is used as the reward for eligible users.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
```

### **2️⃣ Merkle Tree Generation**
Since storing a large whitelist on-chain is expensive, so I used a **Merkle Tree**:  

- **generateMerkleRoot.js**:
  - Takes a list of whitelisted addresses.
  - Hashes them using `keccak256`.
  - Constructs a **Merkle Tree**.
  - Outputs the **Merkle Root** and proofs.


### **3️⃣ Airdrop Contract (Airdrop.sol)**
The **Airdrop.sol** contract verifies claims using the Merkle Root:  

- The constructor takes:
  - **Token address** (ERC-20 token).
  - **Merkle Root** (for whitelist verification).
  - **Claim amount** per user.
- Uses `MerkleProof` library to verify users.



### **4️⃣ Deployment using Hardhat Ignition**
I deployed both contracts with **Ignition modules**:



### **5️⃣ Frontend (React + ethers.js)**
The frontend allows users to:
✔️ **Connect wallet**  
✔️ **Claim airdrop**  
✔️ **Check balance**  

With this setup, I was able to let users claim the airdrop.



### Neccessary links:

 [token address](https://sepolia-explorer.metisdevops.link/address/0xffa92602359272214f833bfC851e8d3dEaE91De3)

 [airdrop address](https://sepolia-explorer.metisdevops.link/address/0x81fa58033896eA119E7e28A9510c9ea1152D7D6c)


### Deployed frontend link: 

 [airdrop-frontend-project](https://airdrop-frontend-project.vercel.app/)



