// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract AreaCalculator{
    function triangleArea (uint256 base, uint256 height) public pure returns (uint256){
        require(base > 0 && height > 0, "Base and height must be greater than zero");
        return (base * height) / 2;
    }

    function rectangleArea (uint256 length, uint256 breadth) public pure returns (uint256){
        require(length > 0 && breadth > 0, "Length and breadth must be greater than zero");
        return length * breadth;
    }
    
    function squareArea (uint256 side) public pure returns (uint256){
        require(side > 0, "Side must be greater than zero");
        return side * side;
    }
}