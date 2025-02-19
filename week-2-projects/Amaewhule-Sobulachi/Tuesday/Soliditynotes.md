
# INTRODUCTION TO SOLIDITY

Solidity is an object-oriented, high-level language for implementing smart contracts. Smart contracts are programs that govern the behavior of accounts within the Ethereum blockchain.
It is influenced by C++, Python, and JavaScript and its files have a .sol extension.

---

# Installing the Solidity Compiler

This can be done differently depending on the operating system being used.

## Windows

Type "npm install -g solc" in the terminal of your IDE

---

## Linux
it can be installed on linux by pasting the following:

1. sudo add-apt-repository ppa:ethereum/ethereum
2. sudo apt-get update
3. sudo apt-get install solc

---

## Mac

It can be installed on Mac by pasting the following:

1. brew update
2. brew upgrade
3. brew tap ethereum/ethereum
4. brew install solidity

---

# Layout of a Solidity Source File

1. SPDX License Identifier:  Every source file should start with a comment indicating its license:

// SPDX-License-Identifier: MIT

2. Version Pragmas

The pragma keyword is used to enable certain compiler features or checks. Source files can (and should) be annotated with a version pragma to reject compilation with future compiler versions that might introduce incompatible changes.

ex: pragma solidity ^0.5.2;

3. Importing other Source Files

Solidity supports import statements to help modularise your code that are similar to those available in JavaScript

ex: import "Sobulachi";

4. Comments

ex: // My firsy solidity project.

---

# Contract Structure

1. Functions: Functions are chunks of code that can be executed. In solidity, they are usually defined in contract but can be defined outside as well.

2. Events: Events are convenience interfaces with the EVM logging facilities.
They allow contracts to notify users/clients of changes  ex

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.22;

event HighestBidIncreased(address bidder, uint amount); // Event

contract SimpleAuction {
    function bid() public payable {
        // ...
        emit HighestBidIncreased(msg.sender, msg.value); // Triggering event
    }
}
3. Errors: These allow you to define descriptive names and data for failure situations.

4. Struct types : Structs are custom defined types that can group several variables.

---

# Reserved Keywords

These keywords are reserved in Solidity and might become part of the syntax in the future:

after, alias, apply, auto, byte, case, copyof, default, define, final, implements, in, inline, let, macro, match, mutable, null, of, partial, promise, reference, relocatable, sealed, sizeof, static, supports, switch, typedef, typeof, var.

---

# Best Practices

- Code Organization: Keep code organized and readable.
- Commenting: Use comments to explain code.
- Testing: Thoroughly test contracts before deployment

# Further Reading

[Solidity docs](https://docs.soliditylang.org/en/latest/structure-of-a-contract.html#)