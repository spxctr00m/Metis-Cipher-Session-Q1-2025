// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract AreaCalculator{


 function AreaofTriangle( uint256 base, uint256 height) public pure returns (uint256){
        return ((base * height)/2);
     }

function AreaofRectangle(uint256 length,uint256 breadth) public pure returns (uint256){
        return (length * breadth);
     }

function AreaofSquare(uint256 side) public pure returns (uint256){
        return (side * side);
     }











}
