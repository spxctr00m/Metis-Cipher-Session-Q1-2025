// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract AreaCalculator {

    function areaOfATriangle(uint base, uint height) public pure returns (uint _areaOfTriangle) {
        return base * height / 2;
    }

    function areaOfARectangle(uint length, uint breadth) public pure returns (uint _areaOfRectangle) {
        return length * breadth;
    }

    function areaOfASquare(uint length) public pure returns (uint _areaOfSquare) {
        return length**2;
    }

}