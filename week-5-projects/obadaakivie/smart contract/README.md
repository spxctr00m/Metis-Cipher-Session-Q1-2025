
# Grant Management Smart Contract

This Solidity smart contract enables an owner to create and manage grants for beneficiaries. The grants are time-locked, meaning a beneficiary can only access the funds after a specified time has elapsed. The owner retains the ability to revert a grant before the time limit expires.

## Features

- **Grant Creation**: The contract owner can allocate funds to a beneficiary with a specific release time.
- **Time-Locked Withdrawal**: Beneficiaries can withdraw their grants only after the set time has passed.
- **Grant Reversion**: The owner can cancel the grant before the release time.
- **Grant Information Retrieval**: Query details of a specific beneficiary's grant.
- **Contract Balance Check**: View the total Ether stored in the contract.
- **Time Left Check**: Determine how much time remains before a grant is accessible.

## Deployment on Metis Sepolia Testnet

### Prerequisites

- **Node.js & npm**: Install from [Node.js](https://nodejs.org/)
- **Hardhat**: Install via npm  
  ```sh
  npm install --save-dev hardhat
  ```
- **Metamask Wallet**: Fund it with Metis Sepolia test tokens


### Steps to Deploy



2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file and add:
   ```sh
   PRIVATE_KEY=my_wallet_private_key
   METIS_SEPOLIA_RPC_URL = process.env.METIS_SEPOLIA_RPC_URL;
   ```

4. **Compile the Smart Contract**
   ```sh
   npx hardhat compile
   ```

5. **Deploy to Metis Sepolia**
   ```sh
   npx hardhat ignition deploy ./ignition/modules/GrantContract.js --network metisSepolia
   ```

6. **Verify Deployment**  
   Check the contract address output and verify it on the [Metis Sepolia Block Explorer](https://sepolia.explorer.metis.io/).

note: my private key was placed in .env file.

