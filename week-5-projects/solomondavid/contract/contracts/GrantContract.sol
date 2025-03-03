// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GrantContract is ERC20 {
    struct Grant {
        address beneficiary;
        uint256 amount;
        uint256 releaseTime;
        bool active;
    }

    address public owner;
    Grant[] private grants;
    uint256 public totalFunds;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyBeneficiary() {
        bool exists = false;
        for (uint256 i = 0; i < grants.length; i++) {
            if (grants[i].beneficiary == msg.sender) {
                exists = true;
                break;
            }
        }
        require(exists, "No grant assigned");
        _;
    }

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    function createGrant(address _beneficiary, uint256 _amount, uint256 _releaseTime) external onlyOwner {
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(balanceOf(owner) >= _amount, "Insufficient tokens");
        require(_amount > 0, "Grant amount must be greater than 0");
        
        grants.push(Grant({
            beneficiary: _beneficiary,
            amount: _amount,
            releaseTime: _releaseTime,
            active: true
        }));

        totalFunds += _amount;
        _transfer(owner, address(this), _amount);
    }

    function revertGrant(address _beneficiary) external onlyOwner {
        for (uint256 i = 0; i < grants.length; i++) {
            if (grants[i].beneficiary == _beneficiary && grants[i].active) {
                require(block.timestamp < grants[i].releaseTime, "Cannot revert after release time");
                uint256 amount = grants[i].amount;
                grants[i].active = false;
                totalFunds -= amount;
                _transfer(address(this), owner, amount);
                break;
            }
        }
    }

    function claimGrant() external onlyBeneficiary {
        for (uint256 i = 0; i < grants.length; i++) {
            if (grants[i].beneficiary == msg.sender && grants[i].active) {
                require(block.timestamp >= grants[i].releaseTime, "Grant is not yet released");
                uint256 amount = grants[i].amount;
                grants[i].active = false;
                totalFunds -= amount;
                _transfer(address(this), msg.sender, amount);
                break;
            }
        }
    }

    function getGrantInfo(address _beneficiary) external view returns (uint256, uint256, bool) {
        for (uint256 i = 0; i < grants.length; i++) {
            if (grants[i].beneficiary == _beneficiary) {
                return (grants[i].amount, grants[i].releaseTime, grants[i].active);
            }
        }
        return (0, 0, false);
    }

    function getTotalFunds() external view returns (uint256) {
        return totalFunds;
    }

    function getTimeLeft(address _beneficiary) external view returns (uint256) {
        for (uint256 i = 0; i < grants.length; i++) {
            if (grants[i].beneficiary == _beneficiary && grants[i].active) {
                if (block.timestamp >= grants[i].releaseTime) {
                    return 0;
                }
                return grants[i].releaseTime - block.timestamp;
            }
        }
        revert("No active grant");
    }
}