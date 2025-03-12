// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract NigerianPresidentialElection2027 {
    struct Voter {
        string name;
        bool hasVoted;
    }
    
    struct Contestant {
        string name;
        uint256 voteCount;
    }
    
    address[] public admins;
    mapping(address => Voter) public voters;
    mapping(address => Contestant) public contestants;
    address[] public contestantList;
    
    uint256 public electionStart;
    uint256 public electionEnd;
    address public presidentElect;
    
    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Only admins allowed");
        _;
    }
    
    modifier onlyDuringElection() {
        require(block.timestamp >= electionStart && block.timestamp <= electionEnd, "Election closed");
        _;
    }
    
    constructor(address[] memory _admins, uint256 _start, uint256 _end) {
        require(_admins.length == 5, "Exactly 5 admins required");
        admins = _admins;
        electionStart = _start;
        electionEnd = _end;
    }
    
    function isAdmin(address _user) public view returns (bool) {
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == _user) return true;
        }
        return false;
    }
    
    function registerVoter(address _voter, string memory _name) public onlyAdmin {
        require(bytes(voters[_voter].name).length == 0, "Already registered");
        voters[_voter] = Voter(_name, false);
    }
    
    function registerContestant(address _contestant, string memory _name) public {
        require(bytes(contestants[_contestant].name).length == 0, "Already registered");
        contestants[_contestant] = Contestant(_name, 0);
        contestantList.push(_contestant);
    }
    
    function vote(address _contestant) public onlyDuringElection {
        require(bytes(voters[msg.sender].name).length > 0, "Not registered");
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(bytes(contestants[_contestant].name).length > 0, "Invalid contestant");
        
        voters[msg.sender].hasVoted = true;
        contestants[_contestant].voteCount++;
    }
    
    function declareWinner() public {
        require(block.timestamp > electionEnd, "Election ongoing");
        require(presidentElect == address(0), "Winner already declared");
        
        address winner;
        uint256 highestVotes = 0;
        
        for (uint256 i = 0; i < contestantList.length; i++) {
            if (contestants[contestantList[i]].voteCount > highestVotes) {
                highestVotes = contestants[contestantList[i]].voteCount;
                winner = contestantList[i];
            }
        }
        
        presidentElect = winner;
    }
}
