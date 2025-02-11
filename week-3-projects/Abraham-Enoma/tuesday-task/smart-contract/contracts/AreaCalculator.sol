// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


// author = @spxctr00m ::: https://github.com/spxctr00m

contract AreaCalculator {
    
    function calculateTriangleArea(uint base, uint height) public pure returns (uint) {
        return base * height / 2;
    }

    function calculateRectangleArea(uint length, uint breadth) public pure returns (uint) {
        return length * breadth;
    }

    function calculateSquareArea(uint side) public pure returns (uint) {
        return side * side;
    }
}
