// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Cipher is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor(
        address initialOwner
    ) ERC20("Cipher", "CPH") Ownable(initialOwner) ERC20Permit("Cipher") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
