# Solidity Overview

Solidity is an object-oriented, high-level language for developing smart contracts, which are self-executing agreements governing the behaviour of accounts within the ethereum state that run on the Ethereum Virtual Machine(EVM). 

It allows for writing decentralized applications (dApps) that are deployed to the blockchain. Solidity is heavily influenced by C++, Python, and JavaScript, and it compiles down to bytecode that can be executed on the Ethereum Virtual Machine (EVM).

## Install Solidity Compiler

```
npm install -g solc
```

## Layout of a Solidity Source File

1. **SPDX License Identifier**
   
Every source file should start with a comment indicating its license:

```
// SPDX-License-Identifier: MIT
```

If you do not want to specify a license or if the source code is not open-source, please use the special value `UNLICENSED` (no     usage allowed, not present in SPDX licence list). If your contract is open-source and you want to grant full freedom to others, use `UNLICENSE` (grants all rights to everyone) instead.

2. **Pragmas**
   
Pragma is a special directive that provides instructions to the compiler. It is typically placed at the top of a Solidity contract file and helps control certain behaviors of the compiler, such as which version of the compiler to use or enabling/disabling specific features.

```
pragma solidity ^0.8.0;
```

A source file with the line above does not compile with a compiler earlier than version 0.8.0, and it also does not work on a compiler starting from version 0.6.0 (this second condition is added by using `^`).

3. **Importing other source files**
   
```
import "filename";
```

## Structure of a Contract

Contracts in Solidity are similar to classes in object-oriented languages and can contain declarations of State Variables, Functions, Function Modifiers, Events, Errors, Struct Types and Enum Types. Also, contracts can inherit from other contracts.

1. **State Variables**

State variables hold the data of a contract and are stored on the blockchain. They represent the persistent state of the contract and can be accessed and modified during contract execution.

**Types of State Variables:**

- *uint / int:*
    uint (unsigned integer) represents non-negative integers (e.g., uint256 for 256-bit unsigned integers).
    int represents integers that can be negative or positive (e.g., int256 for 256-bit signed integers).
  
    Example: 
    ```
    uint256 public totalSupply;
    ```

- *bool:*
    Represents a boolean value (either true or false).
  
    Example: 
    ```
    bool public isActive;
    ```

- *address:*
    Represents an Ethereum address (used for storing addresses of users or contracts).
  
    Example: 
    ```
    address public owner;
    ```

- *bytes:*
    Represents a dynamic array of bytes.
  
    Example: 
    ```
    bytes public data;
    ```

    You can also use fixed-length types like bytes32, bytes16, etc., for a specific byte length.
  
- *string:*
    Represents dynamic-length UTF-8 encoded data.
  
    Example: 
    ```
    string public name;
    ```

- *array:*
    Solidity supports both static and dynamic arrays.
    Static arrays have a fixed size, while dynamic arrays can change their size during execution.
  
    Example: 
    ```
    uint[] public values; 
    // dynamic
    ```
     or 
     ```
     uint[5] public fixedValues;
     //static
     ```
     
- *mapping:*
    A mapping is like a hash table or dictionary that stores key-value pairs.
  
    Example: 
    ```
    mapping(address => uint) public balances; 
    //mapping addresses to uint values
    ```
    
2. **Functions**
   
Functions define the behavior of a contract. They can read and modify state variables or interact with other contracts.

**Types of Functions:**

- *public:*
    Functions can be called both externally (from outside the contract) and internally (from within the contract or derived contracts).
  
    Example: 
    ```
    function setOwner(address _owner) public;
    ```

- *internal:*
    Functions can only be called from within the contract or derived contracts.
  
    Example: 
    ```
    function updateBalance(address _user) internal;
    ```

- *external:*
    Functions can only be called externally (by other contracts or transactions).
  
    Example: 
    ```
    function transfer(address recipient, uint amount) external;
    ```

- *private:*
    Functions can only be called within the current contract.
  
    Example: 
    ```
    function calculateFee(uint amount) private;
    ```

3. **Function Modifiers**
   
Modifiers are used to change the behavior of functions, often used for access control or validation.

**Types of Modifiers:**

- *Access Control Modifiers (e.g., onlyOwner):*
    These ensure that only authorized addresses can call certain functions.
  
    Example:    
    ```
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    ```

- *Condition Check Modifiers*
    These validate certain conditions before executing the function.
  
    Example:
    ```
    modifier validAmount(uint amount) {
        require(amount > 0, "Amount must be greater than 0");
        _;
    }
    ```
    
- *State Modifiers:*
    These can be used to control whether a function can modify the state or only read it.

4. **Events**
   
Events allow external applications to listen to specific changes in the contract's state. They provide an efficient way of logging data and notifying listeners about contract activities.

**Types of Events:**

- *Indexed:*
    Indexed parameters allow you to search for specific events.
  
    Example:
    ```
    event Transfer(address indexed from, address indexed to, uint amount);
    ```

5. **Errors**
   
Errors are used to revert transactions or notify users of failures. Solidity 0.8.x introduced custom errors for better gas efficiency compared to require statements.

**Types of Errors:**

- *Custom Errors:*
    Custom errors allow developers to define specific error messages.
  
    Example:
    ```
    error InsufficientFunds(uint requested, uint available);
    ```
    
- *Revert:*
    Solidity also supports the revert() function, which can revert the transaction with a reason string.
  
    Example:
    ```
    revert("Insufficient funds");
    ```

6. **Struct Types**
   
Structs allow you to define custom data types that group related variables together. They are often used for complex data structures.

**Types of Structs:**

- *Simple Structs:*
    Grouping basic types together.
  
    Example:
    ```
    struct Person {
        string name;
        uint age;
    }
    ```

- *Nested Structs:*
    Structs can contain other structs as their fields.
  
    Example:
    ```
    struct Company {
        string name;
        Person owner;
    }
    ```

7. **Enum Types**
   
Enums define a set of named constants that can be used for representing states or options within the contract.

**Types of Enums:**

- *Basic Enum:*
    Defines a set of possible values with names.
  
    Example:
    ```
    enum Status { Pending, Active, Closed }
    ```
- *Enum in Conditions:*
    Enums are often used in if or switch conditions to control logic flow.
  
    Example:
    ```
    Status public currentStatus;
    function setStatus(Status _status) public {
        currentStatus = _status;
    }
    ```

8. **Contract Inheritance**

Solidity contracts can inherit from other contracts, allowing for code reuse and modular development.

**Types of Inheritance:**

- *Single Inheritance:*
    A contract can inherit from one parent contract.
  
    Example:
    ```
    contract Child is Parent {
        // inherits functions and state from Parent
    }
    ```

- *Multiple Inheritance:*
    A contract can inherit from more than one parent contract.
    Solidity handles this using linearization to avoid ambiguity.
  
    Example:
    ```
    contract Child is Parent1, Parent2 {
        // inherits from both Parent1 and Parent2
    }
    ```
