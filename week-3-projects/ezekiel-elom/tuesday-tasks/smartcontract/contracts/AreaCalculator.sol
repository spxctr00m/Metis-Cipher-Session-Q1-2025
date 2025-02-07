// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AreaCalculator {
    // Function to calculate the area of a triangle
    function calculateAreaOfTriangle(uint base, uint height) public pure returns (uint) {
        return (base * height) / 2;

    }

    // Function to calculate the area of a rectangle
    function calculateAreaOfRectangle(uint length, uint breadth) public pure returns (uint) {
         return length * breadth;

    }

    // Function to calculate the area of a square
    function calculateAreaOfSquare(uint side) public pure returns (uint) {
         return side * side;

    }
}



