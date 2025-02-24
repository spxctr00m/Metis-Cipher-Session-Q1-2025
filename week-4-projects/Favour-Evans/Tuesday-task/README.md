# Voting Contract Project for week-4-projects

## Verified Contract Address

**Contract address**

Here is the verified [voting contract address](https://sepolia-explorer.metisdevops.link/address/0x1c5B583D8e025D2c38EF494ac74accC82F63fE79).


This project implements a decentralized voting system for the 2027 Nigerian Presidential election using a Solidity smart contract (VotingContract.sol). The contract ensures secure voter and contestant registration, transparent voting, and automatic calculation of the election result. Deployment is managed using Hardhat Ignition.


## Features

- Voter Registration: Admins register voters with name, age, NIN, and nationality.
- Contestant Registration: Contestants register with name, age, party, and manifesto.
- Voting Process: Only registered voters can vote, and they can only vote once.
- Transparency: Vote counts and total votes are publicly visible.
- Admin Control: Only 5 designated admins can register voters.
- President-Elect: The contract automatically calculates the winner after voting ends.


## Deployment Setup

1. Install dependencies:
  
Bash

   npm install --save-dev hardhat @nomicfoundation/hardhat-ignition
   
2. Save VotingContract.sol in the contracts folder.

3. Save VotingContract.js in the ignition/modules folder.

4. Configure hardhat.config.js for your desired network (e.g., localhost, Sepolia).



## Deployment Steps

1. Run the deployment script:
  
Bash

   npx hardhat ignition deploy ignition/modules/VotingContract.js --network <metis_sepolia>
   
2. Replace <metis-sepolia> with your target network.
---

## Usage

- Admins can register voters and contestants.
- Registered voters can vote for their preferred contestant.
- After voting ends, call endElection to declare the president-elect.


### Overflow vs. Underflow in Solidity

Overflow and underflow are common issues in Solidity when working with integer types (uint and int). Here's a brief explanation:

1. Overflow:  
   - Occurs when a value exceeds the maximum limit of its data type.  
   - Example: A uint8 can store values from 0 to 255. If you add 1 to 255, it overflows and wraps around to 0.  
   - Solidity 0.8.0+ automatically reverts on overflow.

2. Underflow:  
   - Occurs when a value goes below the minimum limit of its data type.  
   - Example: A uint8 cannot go below 0. If you subtract 1 from 0, it underflows and wraps around to 255.  
   - Solidity 0.8.0+ automatically reverts on underflow.

Key Difference:  
- Overflow happens when a value exceeds the upper limit.  
- Underflow happens when a value goes below the lower limit.  

Both can lead to unexpected behavior, but Solidity 0.8.0+ prevents them by default. For older versions, use libraries like OpenZeppelin's SafeMath.