#verified contract address (sourcify) : https://repo.sourcify.dev/contracts/full_match/59902/0x3d888F268d14EA4f6A12f07B5aC1C32A80d10d2F/ 

#short Note: difference between =,==,=== in solidity
In Solidity, the symbols =, ==, and === have distinct meanings and uses.

1. = (Single Equals Sign):
Purpose: Assignment operator.

Usage: Used to assign a value to a variable.

Example: uint256 x = 10; // Assigns the value 10 to the variable x

2. == (Double Equals Sign):
Purpose: Equality comparison operator.

Usage: Used to compare two values or expressions to check if they are equal.

Returns: true if the values are equal, false otherwise.

Example: uint256 a = 5;
uint256 b = 5;
bool isEqual = (a == b); // isEqual will be true because a and b are equal

3. === (Triple Equals Sign):
Purpose: Not valid in Solidity.

Usage: Solidity does not support the === operator. This operator is used in some other programming languages (like JavaScript) for strict equality checks, but it has no meaning in Solidity.

Example:// This will result in a compilation error in Solidity
bool isStrictEqual = (a === b); // Invalid syntax in Solidity
