# Week 6: Building a Voting Frontend and Integrating a Smart Contract

Welcome to Week 6 of our training program! This week, you will build a simple frontend for the voting smart contract you created in Week 4 and integrate it to enable users to interact with the contract through a web interface.

---

## Instructions for Week 6 Project

### Part 1: Build a Voting Frontend

1. **Create a simple frontend using HTML, CSS, and JavaScript (React Vite is recommended).**
   - The frontend should allow users to:
     - Register as voters (if they meet the criteria).
     - Register as contestants.
     - Vote within the allowed voting period.
     - View the vote counts for each contestant.
     - View the total votes collected.
     - Display the final president-elect after the voting period ends.
   - Ensure that the UI is user-friendly and displays relevant messages to users.

2. **Integrate the Smart Contract**
   - Use **ethers.js** or **web3.js** or any other wallet connector to connect the frontend to the smart contract.
   - Implement the necessary contract function calls from the frontend.
   - Handle contract events and display relevant updates in real-time.

3. **Test on a Blockchain Testnet**
   - Deploy your frontend and test it with the smart contract on a testnet.
   - Ensure proper connection between the frontend and the deployed contract.
   - Debug and fix any issues encountered.

4. **Take Screenshots**
   - Capture a screenshot of the working frontend interface.
   - Capture a screenshot of successful transactions from the frontend to the blockchain.
   - Capture a screenshot of the smart contract logs on the blockchain explorer showing votes being counted.

5. **Document Your Work**
   - Create a `README.md` file inside your project folder.
   - Include your contract address, frontend setup instructions, and a short explanation of how the frontend interacts with the smart contract.

---

## How to Contribute Your Work

### Submission Guidelines
- Create a new folder named after your full name inside the `week-6-projects` folder of the repository.
- Your folder should include all relevant files.
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
   - Create a subfolder named after your name (e.g., `john-doe`).
   - Add your frontend code, integration scripts, and README.

4. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add Week 6 Voting Frontend project for <your_name>"
   ```
   Example:
   ```bash
   git commit -m "Add Week 6 Voting Frontend project for John Doe"
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
- Ensure your frontend properly interacts with the smart contract.
- Make sure your UI is intuitive and user-friendly.
- If you encounter any issues, reach out to your facilitator for guidance.
- Follow the repository’s contribution guidelines for consistency.

Happy coding, and good luck with your voting frontend! 🚀
