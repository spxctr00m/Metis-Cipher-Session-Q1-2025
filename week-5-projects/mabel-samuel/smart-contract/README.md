# Grant Contract

## Contract Address

This is the verified grant contract address [link](h).

## Deployment Steps


## Overview of Grant Contract

This contract allows an owner to create time-locked grants for beneficiaries. The grant funds can only be withdrawn after a specified period, and the owner has the ability to revert the grant before the release time.

### Breakdown of Key Components

1️. **Ownable Contract**

This ensures only the contract owner can create or revert grants.
The onlyOwner modifier is used to restrict certain functions to the owner.

2️. **Grant Struct & Mapping**

The Grant struct stores:

- amount: The grant amount in Wei.
- releasePeriod: The timestamp when the grant can be withdrawn.
- isActive: A flag to track if the grant is still available.

The mapping grants links each beneficiary to their grant.

3️. **Grant Creation (createGrant)**

The owner must be able to create a new grant.
It ensures the grant amount is greater than 0, the beneficiary doesn’t already have an active grant, stores the grant and sets the release time (block.timestamp + _releasePeriod) and emits a GrantCreated event for transparency.

4️. **Grant Reversion (revertGrant)**

The owner should have the option to cancel a grant before its release time.

It ensures there is an active grant, the release time hasn’t passed yet, refunds the owner and removes the grant. It also emit a GrantReverted event.

5️. **Grant Withdrawal (withdrawGrant)**

The beneficiary should only withdraw their funds after the release period.

It uses the onlyAfterReleasePeriod modifier to ensure time has passed, transfers the grant amount to the beneficiary, marks the grant as inactive and resets the amount to 0 to prevent re-withdrawing and emits a GrantWithdrawn event.

6️. **Retrieve Grant Info (retrieveBeneficiaryInfo)**

Beneficiaries should be able to check their grant details.
It ensures the grant exists and returns the Grant struct.

7️. **Check Contract Balance (totalStoredEther)**

Provides transparency on how much Ether is stored in the contract.

8️. **Time Left Before Grant Release (grantReleaseTimeLeft)**

Beneficiaries should be able to check how much time is left.
It ensures the grant exists, returns 0 if the time has already passed. Otherwise, returns the remaining time.

9️. **Fallback & Receive Functions**

Allows the contract to receive Ether outside of grant creation.