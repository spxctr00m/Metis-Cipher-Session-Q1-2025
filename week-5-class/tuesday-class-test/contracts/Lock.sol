// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Permission denied: Not contract owner!");
        _;
    }
}

contract ExpenseTracker is Ownable {
    struct Expense {
        uint amount;
        string category;
        uint timestamp;
    }

    mapping(address => Expense) private userExpenses;
    mapping(address => mapping(string => uint)) categoryTotal;
    mapping(address => mapping(address => uint)) spendingLimits;
    string[] public categories;

    event ExpenseAdded(
        address user,
        uint amount,
        string category,
        uint timestamp
    );
    event ExpenseRemoved(
        address user,
        uint amount,
        string category,
        uint timestamp
    );
    event CategoryAdded(string category);
    event LimitUpdated(string category, uint limit);

    function addCategory(string memory _category) public onlyOwner {
        categories.push(_category);
        emit CategoryAdded(_category);
    }

    function addExpense(uint _amount, string memory _category) public {
        require(_amount > 0, "Amount must be greater than 0");
        require(bytes(_category).length > 0, "Category must not be empty");

        Expense memory expense = Expense(_amount, _category, block.timestamp);
        userExpenses[msg.sender] = expense;
        categoryTotal[msg.sender][_category] += _amount;

        emit ExpenseAdded(msg.sender, _amount, _category, block.timestamp);
    }
}
