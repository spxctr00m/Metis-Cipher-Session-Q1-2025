# Week 3: Solidity Contract for Area Calculations

Welcome to Week 3 of the Metis Cipher Session Q1 2025!! This guide outlines the tasks for your first week. Follow the instructions carefully and ensure you meet the submission requirements.
This week, your task is to write a Solidity smart contract that calculates the area of a triangle, rectangle, and square. You will deploy the contract using Hardhat and document your work.

---

## Instructions for Week 3 Project

### Part 1: Write a Solidity Contract for Area Calculations

Your task is to write a Solidity smart contract that calculates the area of a triangle, rectangle, and square.

1. **Create a Solidity contract (`AreaCalculator.sol`)** that includes:

   - A function to calculate the area of a **triangle**: `(base * height) / 2`
   - A function to calculate the area of a **rectangle**: `length * breadth`
   - A function to calculate the area of a **square**: `side * side`

2. **Deploy the Contract Using Hardhat**
   - Set up your Hardhat environment.
   - Deploy your contract to the Metis testnet.
3. **Verify the Contract**
   - Verify your contract on the Metis blockchain.
   - Document the verified contract address.
4. **Create a README file**
   - Add the documented verified contract address.
   - Write a short note on the difference between `=`, `==`, and `===` in Solidity.

---

## Submission Guidelines

- Create a new folder named after your full name inside the `week-3-projects` folder of the repository.
- Your folder should include two subfolders: `tuesday-task` and `friday-task`.
- Include all your work in this first folder. Ensure that your submission is organized and well-documented.
- Add a `README.md` file in your folder with:
  - Your verified contract address.
  - Your short note on `=`, `==`, and `===` in Solidity.

---

## How to Contribute Your Work

1. **Navigate to the Week 3 Folder**:

   ```bash
   cd week-3-projects
   ```

2. **Add Your Files**:

   - Create a folder named after your name (e.g., `john-doe`).
   - Create a subfolder for Tuesday's task and add all your folders and files to this folder.
     Hint: Your .md file and Hardhat project folder should be inside "Tuesday" folder. See the illustration below.
     <br><br>
  

   ```plaintext
   week-3-projects
    ├── Folder-With-Your-Name
    │   └── smartcontract        <-- Your hardhat folder
    │   └── ReadMe.md             <-- Readme file with your contract address and note
   ```

---

3. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add Week 3 project for <your_name>"
   ```

Example:

```bash
git commit -m "Add Week 3 project for John Doe"
```

4. **Push Your Changes**:

   ```bash
   git push origin <your_branch_name>
   ```

   Example:

   ```bash
   git push origin main
   ```

5. **Create a Pull Request**:
   - Go to the GitHub repository in your browser.
   - Click on the **Pull Requests** tab and create a new pull request from your branch to the main branch.
   - Add a descriptive title and description for your pull request.

---

## Notes

- Ensure your files are well-organized and properly named.
- If you encounter issues, reach out to the WhatsApp group for assistance.
- Follow the repository’s guidelines to maintain consistency.

Happy coding!
