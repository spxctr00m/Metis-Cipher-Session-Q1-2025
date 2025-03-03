# Week 4: Voting Smart Contract on Solidity

Welcome to Week 4 of Metis Cipher Session Q1 2025! This week, you will design and deploy a Solidity smart contract for a voting system in the upcoming Nigerian presidential election. Your contract must ensure fairness, transparency, and security in the voting process.

---

### Part 1: Write a Solidity Contract for the 2027 Nigerian Presidential Election

Your task is to write a voting smart contract for the next Nigerian presidential election. The contract should take into consideration the following aspects:

- **Voters**: Voters must register before they can vote (collect their age, name, NIN, nationality, etc).
- **Contestants**: Contestants must also register before they can be voted for (collect their name, age, party, manifesto, etc).
- **Voting Process**: Only registered and qualified voters should be able to vote.
- **Vote Transparency**: Everyone should be able to see the vote counts of each contestant and the total votes cast.
- **Admin Control**: Only 5 designated admins (voting officials) should be able to register voters.
- **President elect**: The result of the election should be calculated immediately the election period and a  variable should store the president-elect after the voting time has elapsed.
- **Extra Features**: Feel free to add any additional functionality that enhances security and usability.

---

### Part 2: Deploy the Contract

1. **Create a Solidity contract (`VotingContract.sol`)** that includes the functionalities mentioned above.
2. **Deploy the contract using Hardhat**.
3. **Verify your contract on the Metis blockchain**.
4. **Document your contract and deployment details in a README file**.

---

### Part 3: Submission Guidelines

- Create a new folder named after your full name inside the `week-4-projects` folder of the repository.
- Your folder should include two folders for Tuesday and Friday tasks summarizing your work and answers.
- Include all your work in this folder, ensuring that your submission is organized and well-documented.
- Include screenshots of your deployed and verified smart contract and any relevant execution steps as image files in your folder.

---

### Part 4: Overflow and Underflow in Solidity

In your README file, write a short note explaining the difference between overflow and underflow in Solidity.

---

### How to Contribute Your Work

1. **Navigate to the Week 4 Folder**:
   ```bash
   cd week-4-projects
   ```

2. **Add Your Files**:
   - Create a subfolder named after your name (e.g., `john-doe`).
   - Add all your Solidity files, README, and screenshots to this folder.

4. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add Week 4 project for <your_name>"
   ```

   Example:
   ```bash
   git commit -m "Add Week 4 project for John Doe"
   ```

5. **Push Your Changes**:
   ```bash
   git push origin <your_branch_name>
   ```

   Example:
   ```bash
   git push origin week-4-john-doe
   ```

6. **Create a Pull Request**:
   - Go to the GitHub repository in your browser.
   - Click on the **Pull Requests** tab and create a new pull request from your branch to the main branch.
   - Add a descriptive title and description for your pull request.

---

## Notes

- Ensure your files are well-organized and properly named.
- If you encounter issues, reach out to your facilitator for assistance.
- Follow the repository’s guidelines to maintain consistency.

Thank you for participating in Week 4, and happy coding!
