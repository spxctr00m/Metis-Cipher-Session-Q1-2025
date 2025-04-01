// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CustomToken.sol";

contract TokenFactory {
    event TokenCreated(address indexed tokenAddress, string name, string symbol, uint256 totalSupply, address owner);

    address[] public deployedTokens;

    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) external {
        CustomToken newToken = new CustomToken(name, symbol, totalSupply, msg.sender);
        deployedTokens.push(address(newToken));

        emit TokenCreated(address(newToken), name, symbol, totalSupply, msg.sender);
    }

    function getDeployedTokens() external view returns (address[] memory) {
        return deployedTokens;
    }
}
