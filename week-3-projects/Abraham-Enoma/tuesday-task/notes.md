## Verified contract address: 0x142b81F49bF28383416709859a03Efe698e395b2
![image](https://github.com/user-attachments/assets/96584178-fa48-41db-97ce-00577f7fab61)


# Difference Between =, ==, and === in Solidity

In Solidity:

- **`=` (Assignment Operator)**: Used to assign values to variables. Example:
  ```solidity
  uint x = 10;
  ```

- **`==` (Equality Operator)**: Compares two values for equality and returns `true` if they are the same. Example:
  ```solidity
  bool isEqual = (x == 10); // true
  ```

- **`===` (Strict Equality Operator)**: Unlike JavaScript, Solidity **does not** have `===`. It only uses `==` for comparisons.

So, in Solidity, `=` is for assignment, and `==` is for checking equality.

