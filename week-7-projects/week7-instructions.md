# **Week 7: Token Factory Smart Contract**  

Welcome to **Week 7!** This week, you’ll build a **Token Factory Smart Contract** that allows users to deploy their own ERC-20 tokens with a custom **name, symbol, and total supply**. This contract will serve as a **factory contract** to create multiple token instances efficiently.  

---

## **📌 Project Overview**  

This project consists of two main parts:  
1. **Write and Deploy a Token Factory Smart Contract**  

---

## **🛠️ Part 1: Token Factory Smart Contract**  

### **📜 Contract Requirements**  

- The factory contract should allow anyone to deploy a new ERC-20 token by specifying:  
  - **Token Name**  
  - **Token Symbol**  
  - **Total Supply**  

- The factory contract should:  
  ✅ Deploy a new ERC-20 token contract for each request.  
  ✅ Store a list of all deployed tokens.  
  ✅ Emit an event each time a new token is created.  
  ✅ Assign the total supply to the creator of the token.  

---

## **📂 Submission Guidelines**  

### **Folder Structure**  
Inside the `week-7-projects` folder, create a new folder with your **full name**, e.g., `john-doe`.  
Your folder should contain:  

📌 **Solidity Contracts in one file:**  
✅ `TokenFactory.sol` (Factory Contract for Deploying Tokens)  
✅ `ERC20Token.sol` (Template ERC-20 Contract Used by Factory)  


📌 **Documentation:**  
✅ **`README.md`** file inside your project folder explaining:
   - **Project Task**: Briefly describe what the project is about.  
   - **Implementation**: Explain how the factory contract works, how it deploys tokens, and how the frontend interacts with it.  
   - **Deployed Contract Links**: Add links to the verified contracts on the testnet explorer. 

---

## **📤 How to Submit**  

1. **Clone the Repository**:  
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Navigate to Week 7 Folder**:  
   ```bash
   cd week-7-projects
   ```

3. **Add Your Files**:  
   ```bash
   mkdir john-doe
   cd john-doe
   ```

4. **Commit Your Work**:  
   ```bash
   git add .
   git commit -m "Add Week 7 Token Factory project for <your_name>"
   git push origin <your_branch_name>
   ```

5. **Create a Pull Request (PR)** on GitHub.  

---

## **📌 Notes**  
✅ **Use Hardhat or Foundry** for contract deployment.  
✅ **Verify contracts** on the testnet explorer.  
✅ **Test everything before submission**.  
✅ **Include a detailed `README.md` file** with contract links.  

---

🚀 **Good luck with your Token Factory project!** 🚀
