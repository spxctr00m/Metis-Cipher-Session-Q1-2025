// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./kreedtok.sol";

contract CustomToken is KREED_ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint decimals,
        address tokenOwner
    ) KREED_ERC20(name, symbol, 18, initialSupply) {
        _mint(tokenOwner, initialSupply * (10 ** decimals) );
    }
}


contract TokenFactory {

    address[] public deployedTokens;
    

    //  from creator address to their tokens
    mapping(address => address[]) public creatorTokens;
    
    
    event TokenCreated(address indexed tokenAddress,address indexed creator,string name,string symbol,uint256 initialSupply
    );
    
    function createToken(string memory name,string memory symbol,uint256 initialSupply,uint256 decimals) public returns (address tokenAddress) {
        // Deploy new token with msg.sender as the owner who receives all initial tokens
        CustomToken newToken = new CustomToken(
            name,
            symbol,
            initialSupply,
            decimals,
            msg.sender
        );
        
        // Store the token address
        tokenAddress = address(newToken);
        deployedTokens.push(tokenAddress);
        creatorTokens[msg.sender].push(tokenAddress);
        
        
        emit TokenCreated(
            tokenAddress,
            msg.sender,
            name,
            symbol,
            initialSupply
        );
        
        return tokenAddress;
    }
    
    
    function getDeployedTokensCount() public view returns (uint256 count) {
        return deployedTokens.length;
    }
    
   
    function getTokensByCreator(address creator) public view returns (address[] memory tokens) {
        return creatorTokens[creator];
    }
   
    function getCreatorTokenCount(address creator) public view returns (uint256 count) {
        return creatorTokens[creator].length;
    }
}
