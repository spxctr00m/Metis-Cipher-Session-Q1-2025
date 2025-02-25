
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

contract VotingContract {
   
    struct Voter {
        string name;
        uint age;
        string NIN;
        string nationality;
        bool isRegistered;
        bool hasVoted;
    }

    struct Contestant {
        string name;
        uint age;
        string party;
        string manifesto;
        bool isRegistered;
        uint voteCount;
    }

   
    address public admin;
    mapping(address => bool) public admins;
    mapping(address => Voter) public voters;
    mapping(uint => Contestant) public contestants;
    uint public contestantCount;
    bool public electionEnded;
    address public presidentElect;

    
    event VoterRegistered(address indexed voterAddress, string name);
    event ContestantRegistered(uint indexed contestantId, string name);
    event Voted(address indexed voterAddress, uint indexed contestantId);
    event ElectionEnded(address indexed presidentElect);

    
    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can perform this action.");
        _;
    }

    modifier electionOngoing() {
        require(!electionEnded, "Election has ended.");
        _;
    }

    
    constructor() {
        admin = msg.sender;
        admins[msg.sender] = true;
    }

   
    function addAdmin(address newAdmin) external onlyAdmin {
        require(!admins[newAdmin], "Address is already an admin.");
        admins[newAdmin] = true;
    }

    
    function registerVoter(
        address voterAddress,
        string memory name,
        uint age,
        string memory NIN,
        string memory nationality
    ) external onlyAdmin electionOngoing {
        require(!voters[voterAddress].isRegistered, "Voter already registered.");
        require(age >= 18, "Voter must be at least 18 years old.");
        voters[voterAddress] = Voter(name, age, NIN, nationality, true, false);
        emit VoterRegistered(voterAddress, name);
    }

    function registerContestant(
        string memory name,
        uint age,
        string memory party,
        string memory manifesto
    ) external electionOngoing {
        require(age >= 35, "Contestant must be at least 35 years old.");
        contestantCount++;
        contestants[contestantCount] = Contestant(name, age, party, manifesto, true, 0);
        emit ContestantRegistered(contestantCount, name);
    }

    function vote(uint contestantId) external electionOngoing {
        require(voters[msg.sender].isRegistered, "Voter not registered.");
        require(!voters[msg.sender].hasVoted, "Voter has already voted.");
        require(contestants[contestantId].isRegistered, "Contestant not registered.");

        voters[msg.sender].hasVoted = true;
        contestants[contestantId].voteCount++;
        emit Voted(msg.sender, contestantId);
    }

  
    function endElection() external onlyAdmin electionOngoing {
        uint highestVotes = 0;
        uint winningContestantId = 0;

        for (uint i = 1; i <= contestantCount; i++) {
            if (contestants[i].voteCount > highestVotes) {
                highestVotes = contestants[i].voteCount;
                winningContestantId = i;
            }
        }

        require(winningContestantId != 0, "No contestant received votes.");
        presidentElect = msg.sender;
        electionEnded = true;
        emit ElectionEnded(presidentElect);
    }

   
    function getContestantVotes(uint contestantId) external view returns (uint) {
        return contestants[contestantId].voteCount;
    }

    function getTotalVotes() external view returns (uint) {
        uint totalVotes = 0;
        for (uint i = 1; i <= contestantCount; i++) {
            totalVotes += contestants[i].voteCount;
        }
        return totalVotes;
    }
}