# Week 3 Tasks

## Verified Contract Address

**Contract address**
 
Here is my [contract address](https://sepolia-explorer.metisdevops.link/address/0x97E35478E7De5D8ef8d120dA6f861ABcE65Ed1F4#code).


## Difference Between `=`, `==`, and `===` in Solidity

- **ASSIGNMENT OPERATOR (`=`):** 

    This is a simple assignment operator used to assign the value on the right to the variable on the left. 
    
    E.g, 

    ```
    uint256 balance = 300;
    ```

- **EQUALITY OPEARTOR (`==`):** 

    This is a comparison operator used to check if two operands(left and right operand) are exactly the same and evaluates to true if the left and right operand are the same or false if the left and right operand are not the same.

    E.g,

    ```
    bool isApproved = (sender == owner);
    ```

- **STRICTLY EQUAL (`===`):** 

    This is a comparison operator used to check if two operands (left and right operand) are exactly the same and are of the same value type. It evaluates to true if the left and right operand are the same and are of the same value type or false if the left and right operand are not the same/ the same value type, i.e if the two operands are of the same value but different value types, it then evaluates to false.

    This is not supported in solidity so for comparisons use equality operator (`==`).
