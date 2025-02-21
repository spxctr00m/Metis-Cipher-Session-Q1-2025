# GrantContract

## **Overview**

`GrantContract.sol` is a Solidity smart contract that allows an owner to create time-locked grants for beneficiaries. The contract ensures that beneficiaries can only withdraw their funds after a specified release time, while also allowing the owner to revert grants before the funds are unlocked.

## **Features**

- The **owner** can create a grant for a specific beneficiary.
- The **beneficiary** can withdraw the funds only after the set time has elapsed.
- The **owner** can revert a grant before the release time.
- Functions to check grant details, contract balance, and remaining time for a grant.

## **How It Works**

1. **Creating a Grant**

   - The owner calls `createGrant(_beneficiary, _releaseTime)` and sends ETH.
   - The `_releaseTime` must be **in the future** (`block.timestamp + X days`).
   - The contract stores the grant details.

2. **Withdrawing a Grant**

   - The beneficiary calls `withdrawGrant()` after `_releaseTime` has passed.
   - The contract transfers the locked funds to the beneficiary.

3. **Reverting a Grant**

   - The owner can call `revertGrant(_beneficiary)` **before** `_releaseTime`.
   - The locked funds are refunded to the owner.

4. **Checking Grant Information**
   - `getGrantInfo(_beneficiary)`: Returns details of a beneficiary’s grant.
   - `getContractBalance()`: Returns the total Ether stored in the contract.
   - `timeLeft(_beneficiary)`: Shows how much time is left before the grant is unlocked.

## **Deployment & Usage**

- Deploy the contract using Remix, Hardhat, or Foundry.
- Use `createGrant` with a future `_releaseTime` and send ETH.
- Beneficiaries should check `timeLeft` before attempting to withdraw.
- The owner can revert grants if needed.

## **License**

This project is licensed under the **MIT License**.
