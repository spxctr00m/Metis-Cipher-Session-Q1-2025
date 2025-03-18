// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

contract SolomonAreaCalculator {
    // function to calculate area of triangle
    function triangle(int16 base, int16 height) public pure returns (int16) {   
        return (base * height/2);
    }

    // function to calculate area of rectangle
    function rectangle(int16 length, int16 breadth) public pure returns (int16){
        return (length * breadth);
    }

    // function to calculate area of square
    function square(int16 side) public pure returns (int16) {
        return (side * side);
    }
}

//contract address 0x539780a8A443850BBC13f7064a92B984Baa29B4c