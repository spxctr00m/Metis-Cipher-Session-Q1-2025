// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract kreedoken is ERC20, Ownable {
    uint8 private _decimals;

   
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) Ownable(msg.sender) {
        _decimals = decimals_;
        
       
        _mint(msg.sender, initialSupply * (10 ** decimals_));
    }
    
  
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
   
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
