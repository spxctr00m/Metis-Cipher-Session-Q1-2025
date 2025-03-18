# Week 9: Smart Contract Security Audit

## Task Overview
This week, you are required to review all smart contracts written from **Week 3 to Week 8** and identify potential security vulnerabilities. Your task includes:

1. **Auditing the Code**:
   - Carefully analyze each contract for security flaws.
   - Check for common vulnerabilities such as reentrancy, integer overflow/underflow, improper access control, and gas limit issues.
   
2. **Updating the Contracts**:
   - Implement necessary fixes to address identified security risks.
   - Ensure best practices in Solidity development are followed.

3. **Documenting Findings**:
   - Create a `README.md` file in your project folder.
   - Clearly list all vulnerabilities found in each contract.
   - Explain how each vulnerability was fixed with code snippets or explanations.

---

## Steps to Complete the Task

### 1. Review and Identify Vulnerabilities
- Revisit your smart contracts from Week 3 to Week 8.
- Use Solidity security tools such as **Slither**, or **Echidna** for static analysis.
- Look out for:
  - **Reentrancy attacks**
  - **Integer overflow/underflow** (use `SafeMath` or Solidity 0.8+ built-in checks)
  - **Access control flaws** (use `onlyOwner` or role-based restrictions)
  - **Unchecked external calls**
  - **Gas limit issues**
  - **Front-running risks**

### 2. Apply Fixes
- Modify your contracts to resolve any security risks found.
- Ensure best Solidity security practices are applied.
- Use `require` and `modifier` functions to enforce strict validations.

### 3. Document Everything
- Write a `README.md` file summarizing your security updates.
- Include:
  - A **list of vulnerabilities found** in each contract.
  - **How each vulnerability was fixed** with clear explanations.
  - **Code snippets before and after** the fix.
  - **Links to updated contracts** in the repository.

---

## Submission Guidelines

### Folder Structure
- Create a folder named `week-9-security-audit` inside the main repository.
- Add all updated Solidity contracts.
- Include your **README.md** with detailed documentation.


## How to Submit Your Work

1. **Attach a README file** to your submission that includes:
   - The name of the project you contributed to.
   - A short summary of the issue you worked on.
   - The **GitHub link** to the issue you were assigned.
   - The **GitHub link** to your PR (if submitted/merged).
   - Your experience contributing to the project.

2. **Push your README file to GitHub**:
   ```bash
   git add README.md
   git commit -m "Week 8: Open-source blockchain contribution"
   git push origin <your_branch_name>
   ```

3. **Submit your work** by sharing the link to your GitHub repository containing your README file.

---

## Notes
- Ensure all fixes are **properly tested** before submitting.
- Follow Solidity security best practices.
- If you’re unsure about a fix, discuss it with a mentor.

Happy auditing! 🔍🛡️
