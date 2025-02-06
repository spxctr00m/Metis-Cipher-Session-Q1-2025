// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract AreaCalculator {
    function areaOfTriangle(uint breadth, uint height) public pure returns (uint _areaOfTriangle){
        return (breadth * height) / 2; 
    }

    function areaOfRectangle(uint length, uint breadth) public pure returns (uint _areaOfRectangle){
        return length * breadth;
    }

    function areaOfSquare(uint side) public pure returns (uint _areaOfSquare){
        return side * side;
    }
}