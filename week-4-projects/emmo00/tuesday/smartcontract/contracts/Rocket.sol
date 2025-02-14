// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Rocket {
    string public name;
    string public status;

    constructor(string memory _name) {
        name = _name;
        status = "idle";
    }

    function startEngine() public {
        status = "started";
    }

    function stopEngine() public {
        status = "stopped";
    }

    function launch() public {
        status = "launched";
    }

    function getStatus() public view returns (string memory) {
        return status;
    }
}