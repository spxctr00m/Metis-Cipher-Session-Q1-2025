
AIRDROP SITE:  https://kreedokenurl-79ivum8bh-victorkreeds-projects.vercel.app
DEPLOYED AND VERFIED TOKEN (KREEDOKE)(KKK) ADDRESS:  0xE6337571c096afE0569AfC40b6f44F5A5185C9e8
DEPLOYED AND VERIFIED AIRDROP-CONTRACT ADDRESS:  0x9ea02f0bb38F4262154eDdB4BDf7d2561a68FBD7

#WELCOME! TO THE OFFICIAL README OF THE IMPLEMENTATION OF THE OFFICIAL SOURCE CODE TO THE KREEDOKENS! CREDITS:VICTOR KREED.



This repository contains two Solidity smart contracts:
1. kreedoken(KKK): A customizable ERC20 token with minting capabilities
2. Airdrop: A Merkle tree-based distribution system for the ERC20 token

Together, these contracts provide a complete solution for creating and distributing custom tokens to a predefined list of addresses in a gas-efficient manner.

## YourToken Contract

### Overview

`YourToken` is an ERC20-compliant token contract that allows for:
- Customizable name, symbol, and decimal places
- Initial supply minting to the contract deployer
- Additional minting by the contract owner

### Features

- **Customizable Token Properties**: Define your token's name, symbol, and decimal places
- **Initial Supply**: Set the initial token supply at deployment
- **Minting Capability**: The contract owner can mint additional tokens as needed
- **Standard ERC20 Functionality**: Full compatibility with wallets, exchanges, and DeFi protocols

### Contract Details

#### Dependencies

- OpenZeppelin Contracts v4.x:
  - `ERC20.sol` - For standard token functionality
  - `Ownable.sol` - For access control

#### Key Functions

- **Constructor**: Initializes the token with customizable parameters
  
  constructor(
      string memory name_,
      string memory symbol_,
      uint8 decimals_,
      uint256 initialSupply
  )
  

- **decimals()**: Returns the number of decimal places for the token
 
  function decimals() public view virtual override returns (uint8)
 

- **mint()**: Allows the owner to create new tokens
 
  function mint(address to, uint256 amount) public onlyOwner
 

 **Note**: The constructor includes a calculation for initial supply that converts from whole tokens to the correct decimal representation (`initialSupply * (10 ** decimals_)`).

## Airdrop Contract

### Overview

The Airdrop contract provides a secure mechanism for distributing ERC20 tokens to a predefined list of addresses. Instead of storing each eligible address on-chain, the contract uses a Merkle tree approach where only the Merkle root is stored on-chain, significantly reducing gas costs and storage requirements.

### Features

- **Merkle Tree Verification**: Uses cryptographic proofs to verify address eligibility without storing the full list on-chain
- **Single-Time Claims**: Ensures each eligible address can only claim tokens once
- **Fixed Distribution Amount**: Each eligible address receives the same predetermined amount of tokens
- **Admin Controls**: Allows the contract owner to:
  - Update the Merkle root (to modify the whitelist)
  - Update the claim amount
  - Withdraw unclaimed tokens

### Contract Details

#### Dependencies

- OpenZeppelin Contracts v4.x:
  - `IERC20.sol` - For interacting with the ERC20 token
  - `Ownable.sol` - For access control
  - `MerkleProof.sol` - For verifying Merkle proofs

#### Key State Variables

- `token`: The ERC20 token being distributed
- `merkleRoot`: The Merkle root of the whitelist
- `claimAmount`: Amount of tokens each eligible address can claim
- `hasClaimed`: Mapping to track addresses that have already claimed

#### Events

- `TokensClaimed`: Emitted when tokens are successfully claimed
- `MerkleRootUpdated`: Emitted when the Merkle root is updated
- `ClaimAmountUpdated`: Emitted when the claim amount is updated
- `TokensWithdrawn`: Emitted when the owner withdraws tokens

## Integration and Deployment Flow

### Step 1: Deploy the Token Contract

Deploy the `YourToken` contract with your desired parameters:
- `name_`: The full name of your token (e.g., "My Awesome Token")
- `symbol_`: The trading symbol (e.g., "MAT")
- `decimals_`: Number of decimal places (typically 18 for compatibility)
- `initialSupply`: Initial amount of tokens to create (in whole tokens, not wei)

### Step 2: Generate the Merkle Tree

1. Create a list of addresses eligible for the airdrop
2. Generate a Merkle tree using the list (see example in the next section)
3. Save the Merkle root and the proofs for each address

### Step 3: Deploy the Airdrop Contract

Deploy the `Airdrop` contract with:
- `_token`: Address of your deployed `YourToken` contract
- `_merkleRoot`: The Merkle root generated in Step 2
- `_claimAmount`: Amount of tokens each eligible address can claim

### Step 4: Fund the Airdrop Contract

Transfer tokens from the token owner's address to the Airdrop contract:

// Using the YourToken contract
yourToken.transfer(airdropContractAddress, totalAmount);

## Generating Merkle Trees and Proofs

To use the Airdrop contract, you'll need to generate a Merkle tree and proofs:


const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const { ethers } = require('ethers');

// Whitelist addresses
const whitelist = [
  '0x123...', 
  '0x456...', 
  // ... more addresses
];

// Hash addresses to get leafs
const leafNodes = whitelist.map(addr => 
  ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address'], [addr]))
);

// Create Merkle Tree
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

// Get root
const rootHash = merkleTree.getRoot().toString('hex');
console.log('Merkle Root:', '0x' + rootHash);

// Generate proof for a specific address
const address = '0x123...';
const hashedAddress = ethers.utils.keccak256(
  ethers.utils.defaultAbiCoder.encode(['address'], [address])
);
const proof = merkleTree.getHexProof(hashedAddress);
console.log('Merkle Proof:', proof);


## User Guide

### For Token Holders (Claiming Tokens)

To claim tokens from the airdrop:

1. Check if you're eligible:
   
   airdrop.isEligible(yourAddress, merkleProof)

2. Claim your tokens:
   airdrop.claim(merkleProof)

The Merkle proof would typically be provided by the contract deployer or through a frontend application.

#### Token Management

1. **Mint additional tokens**:
   
   yourToken.mint(recipient, amount)


#### Airdrop Management

1. **Update the Merkle root** (to change eligible addresses):
   
   airdrop.updateMerkleRoot(newMerkleRoot)
 

2. **Update the claim amount**:
   
   airdrop.updateClaimAmount(newClaimAmount)

3. **Withdraw unclaimed tokens**:
  
   airdrop.withdrawTokens(amount)
   

## Security Considerations

1. **Proper Token Supply**: Ensure the airdrop contract has enough tokens to fulfill all potential claims
2. **Merkle Tree Generation**: The security of the airdrop depends on correctly generating the Merkle tree
3. **Admin Control**: Both contracts give significant control to the owner; consider implementing:
   - Timelock mechanisms
   - Multi-signature control
   - Eventually renouncing ownership

## License

This project is licensed under the MIT License.
