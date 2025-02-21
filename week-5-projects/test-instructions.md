# Week 5: Test - Building an ERC-20 Token Contract and a Grant Smart Contract

Welcome to Week 5 of our training program! This week, you will implement an ERC-20 token smart contract and a grant management smart contract. You will also deploy the contracts and document your work.

---

## Instructions for Week 5 Test Project

### Part 1: Build a Grant Management Smart Contract

1. **Create a Solidity contract (`GrantContract.sol`)** that implements the following functionalities:
   - The **owner** can create a grant for a beneficiary.
   - The **beneficiary** can only access the grant when the set time elapses.
   - The **owner** can revert the grant before the time elapses.
   - A function to retrieve information about a specific beneficiary.
   - A function to check the total amount of Ether stored in the contract.
   - A function to check the time left before a grant can be released.

2. **Deploy the contract using Remix or Hardhat**:
   - Deploy the contract on a testnet using Remix or Hardhat.
   - Ensure proper handling of time-based constraints.

3. **Verify the contract on the blockchain explorer**:
   - After deployment, verify the contract on the testnet explorer.

4. **Take Screenshots**:
   - Capture a screenshot of your deployment logs.
   - Capture a screenshot of the deployed contract on the testnet explorer.

5. **Document Your Work**:
   - Include your contract address, deployment steps, and a short explanation of how the contract works inside of the `README.md` file.

---

## How to Contribute Your Work

### Submission Guidelines
- Create a new folder named after your full name inside the `week-5-projects` folder of the repository.
- Your folder should include your hardhat project with all relevant files (`GrantContract.sol`, deployment scripts, and `README.md`).
- Include all screenshots and necessary documentation.

### Steps to Submit

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Navigate to the Week 5 Folder**:
   ```bash
   cd week-5-projects
   ```

3. **Add Your Files**:
   - Create a subfolder named after your name (e.g., `john-doe`).
   - Add your Solidity contracts, deployment scripts, screenshots, and README.

4. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add Week 5 ERC-20 token and grant contract project for <your_name>"
   ```
   Example:
   ```bash
   git commit -m "Add Week 5 ERC-20 token and grant contract project for John Doe"
   ```

5. **Push Your Changes**:
   ```bash
   git push origin <your_branch_name>
   ```
   Example:
   ```bash
   git push origin week-5-john-doe
   ```

6. **Create a Pull Request**:
   - Go to the GitHub repository in your browser.
   - Click on the **Pull Requests** tab and create a new pull request from your branch to the main branch.
   - Add a descriptive title and description for your pull request.

---

## Notes
- Ensure your ERC-20 contract follows the standard correctly.
- Ensure your grant contract correctly implements time-based constraints.
- Make sure your code is clean and well-commented.
- If you encounter any issues, reach out to your facilitator for guidance.
- Follow the repository’s contribution guidelines for consistency.

Happy coding, and good luck with your smart contracts! 🚀
