# Week 3 Tasks

## Verified Contract Address

contract address = 

## Difference Between `=`, `==`, and `===` in Solidity

- `=`: 
    This is a simple assignment operator used to assign the value on the right to the variable on the left. 
    
    E.g, 

    ```
    uint256 balance = 300;
    ```

- `==`: 
    This is a comparison operator used to check if two operands(left and right operand) are exactly the same and evaluates to true if the left and right operand are the same or false if the left and right operand are not the same.

    E.g,

    ```
    bool isApproved = (sender == owner);
    ```

- `===`: 
    This is a comparison operator used to check if two operands(left and right operand) are exactly the same and are of the same value type. It evaluates to true if the left and right operand are the same and are of the same value type or false if the left and right operand are not the same/ the same value type, i.e if the two operands are of the same value but different value types, it then evaluates to false.

    E.g,

    ```
    string test = "100";
    uint pay = 100;
    bool isTheSame = (test === pay);
    //This evaluates to false because they are not of the same data type regardless of the fact that both have the same value.
    ```
