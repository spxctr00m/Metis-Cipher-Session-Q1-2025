// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// @title GrantContract
// @author - Abraham Enoma
// Contract Functionalities
//    - The **owner** can create a grant for a beneficiary.
//    - The **beneficiary** can only access the grant when the set time elapses.
//    - The **owner** can revert the grant before the time elapses.
//    - A function to retrieve information about a specific beneficiary.
//    - A function to check the total amount of Ether stored in the contract.
//    - A function to check the time left before a grant can be released.

contract GrantContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    error NotOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyBeneficiary() {
        require(
            grants[msg.sender].exists,
            "No grant available for this address"
        );
        _;
    }

    struct Grant {
        uint amount;
        uint releaseTime;
        bool exists;
    }

    mapping(address => Grant) public grants;

    event GrantCreated(address beneficiary, uint amount, uint releaseTime);
    event GrantReverted(address indexed beneficiary, uint256 amount);
    event GrantWithdrawn(address indexed beneficiary, uint256 amount);

    function createGrant(
        address _beneficiary,
        uint _releaseTime
    ) external payable onlyOwner {
        require(msg.value > 0, "Grant amount must be greater than zero");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(
            !grants[_beneficiary].exists,
            "This beneficiary already has a grant"
        );
        require(
            _releaseTime < block.timestamp,
            "Release time must be in the future"
        );

        grants[_beneficiary] = Grant(msg.value, _releaseTime, true);

        emit GrantCreated(_beneficiary, msg.value, _releaseTime);
    }

    function revertGrant(address _beneficiary) external onlyOwner {
        require(
            grants[_beneficiary].exists,
            "No grant found for this beneficiary"
        );
        require(
            block.timestamp < grants[_beneficiary].releaseTime,
            "Cannot revert after release time"
        );

        uint256 amount = grants[_beneficiary].amount;
        delete grants[_beneficiary];

        payable(owner).transfer(amount);
        emit GrantReverted(_beneficiary, amount);
    }

    function withdrawGrant() external onlyBeneficiary {
        Grant storage grant = grants[msg.sender];
        require(
            block.timestamp >= grant.releaseTime,
            "Grant not yet available"
        );

        uint256 amount = grant.amount;
        delete grants[msg.sender];

        payable(msg.sender).transfer(amount);
        emit GrantWithdrawn(msg.sender, amount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getGrantInfo(
        address _beneficiary
    ) external view returns (uint256 amount, uint256 releaseTime, bool exists) {
        Grant memory grant = grants[_beneficiary];
        return (grant.amount, grant.releaseTime, grant.exists);
    }

    function getTimeLeft(address _beneficiary) external view returns (uint256) {
        require(
            grants[_beneficiary].exists,
            "No grant found for this beneficiary"
        );
        if (block.timestamp >= grants[_beneficiary].releaseTime) {
            return 0;
        }
        return grants[_beneficiary].releaseTime - block.timestamp;
    }
}
