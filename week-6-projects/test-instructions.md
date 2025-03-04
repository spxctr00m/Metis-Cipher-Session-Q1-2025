# Week 6 Test: Deploying an ERC-20 Token and Building a Merkle Tree-Based Airdrop System

Welcome to Week 6 Test! This week, you'll implement a Merkle Tree-based Airdrop Contract where all whitelisted users receive a fixed amount of ERC-20 tokens when they claim. You will also build a frontend to allow users to check their eligibility and claim their airdrop.

---

## Instructions for Week 6 Project

### Project Overview
This project consists of three main parts:

- Deploy an ERC-20 Token
- Build and Deploy a Merkle Tree-Based Airdrop Contract
- Create a Frontend for Users to Claim Their Airdrop



## **📌 Part 1: Deploy an ERC-20 Token**
Write a Solidity contract (MyToken.sol) implementing the ERC-20 standard.

Define the token name, symbol, and total supply.
Mint the total supply to the contract deployer.
Implement standard ERC-20 functions such as transfer, approve, and allowance.
Deploy the contract on a testnet (Goerli, Sepolia, etc.) using Hardhat or Remix.

Verify the contract on the testnet explorer 

## **📌 Part 2: Build an Airdrop Contract Using a Merkle Tree**
🛠️ Contract Requirements
You will build an Airdrop Contract (Airdrop.sol) that distributes tokens based on a Merkle Tree.

- Merkle Tree Verification: Users must be whitelisted in the Merkle Tree to claim tokens.
- Fixed Claim Amount: Each whitelisted address receives a predefined amount of tokens.
- One-Time Claim: Users can only claim once to prevent double claims.
- Admin Controls:
  - Update the Merkle Root (for future airdrops).
  - Update the claim amount (if necessary).
  - Withdraw unclaimed tokens (by the contract owner).

### 🔢 Hint -  Merkle Tree Generation
Before deploying the contract, you need to generate a Merkle Root from a list of whitelisted addresses.

Task:
- Write a JavaScript script using merkletreejs to:
- Generate a Merkle Root from a list of whitelisted addresses.
- Compute and print the Merkle Proof for each whitelisted address.
📌 Hint: Use keccak256 for hashing addresses.

## **📌 Part 3: Build the Airdrop Frontend**
#### ✅ Features
Create a simple frontend that allows users to:
- Connect their wallet (e.g., using MetaMask).
- Check if they are whitelisted.
- Claim airdrop tokens if eligible.
Receive an error message if they are not whitelisted.

#### 🎨 UI Requirements
- Simple and clean interface.
- Clear error messages for ineligible users.
- Transaction confirmation messages.


## 📂 Submission Guidelines
### Folder Structure
Inside the week-6-projects folder, create a new folder with your full name, e.g., john-doe.
Your folder should contain:

📌 Hardhat project folder which contains:
- ✅ MyToken.sol (ERC-20 Token)
- ✅ Airdrop.sol (Merkle Tree-Based Airdrop)
- ✅ Deployment scripts for both contracts
- ✅ JavaScript/Typescript  script for Merkle Tree generation

📌 Frontend project folder:
- ✅ React or HTML/JS project files

📌 Documentation:
- ✅ README.md file inside your project folder explaining:

- Project Task: Briefly describe what the project is about.
- Implementation: Explain how you implemented the ERC-20 token, Merkle Tree generation, and airdrop contract.
- Deployed Contract Links: Add links to the verified contracts on the testnet explorer.
- Deployed Frontend Link: Provide the URL of your hosted frontend (e.g., Vercel, Netlify, or GitHub Pages).
- Screenshots of contract deployments and transactions and frontend.


---

## How to Contribute Your Work

### Submission Guidelines
- Create a new folder inside your existing folder in the `week-6-projects` folder of the repository.
- Your new folder should include all relevant files.
- Include all screenshots and necessary documentation.

### Steps to Submit

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Navigate to the Week 6 Folder**:
   ```bash
   cd week-6-projects
   ```

3. **Add Your Files**:
   - Create a new subfolder named (e.g., `airdrop-contract-project`).
   - Add your  folders, and README.

4. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add Week 6 Airdrop Contract test for <your_name>"
   ```
   Example:
   ```bash
   git commit -m "Add Week 6 Airdrop Contract project for John Doe"
   ```

5. **Push Your Changes**:
   ```bash
   git push origin <your_branch_name>
   ```
   Example:
   ```bash
   git push origin week-6-john-doe
   ```

6. **Create a Pull Request**:
   - Go to the GitHub repository in your browser.
   - Click on the **Pull Requests** tab and create a new pull request from your branch to the main branch.
   - Add a descriptive title and description for your pull request.

---

## Notes
- ✅ Verify contracts on the testnet explorer.
- ✅ Test everything before submission.
- ✅ Include a detailed README.md file with contract links and frontend deployment URL.

🚀 Good luck with your Merkle Tree Airdrop project! 🚀


