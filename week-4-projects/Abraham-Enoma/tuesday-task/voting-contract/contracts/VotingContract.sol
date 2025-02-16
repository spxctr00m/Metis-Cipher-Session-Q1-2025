// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VotingSystem {
    address public i_owner;
    mapping(address => bool) public admins;
    uint public adminCount;
    uint candidateDeposit = 0.01 ether; //Every candidate is required to deposit a minimum of 0.01eth to be qualified
    bool public electionActive;

    // Struct for candidate
    struct Candidate {
        address candidateAddress;
        string name;
        uint8 age;
        string party;
        string manifesto;
        uint256 nin;
        uint256 voteCount;
        bool isRegistered;
        bool approved;
    }
    mapping(address => Candidate) candidates;
    Candidate[] public candidateList;

    // Struct for voter
    struct Voter {
        string name;
        uint8 age;
        uint256 nin;
        string nationality;
        bool isRegistered;
        bool hasVoted;
    }
    mapping(address => Voter) public voters;

    event AdminAdded(address indexed newAdmin);
    event CandidateRegistered(address indexed candidate, string candidateName);
    event VoterRegistered(address indexed voter, string name);
    event CandidateApproved(address indexed candidate, string candidateName);
    event Voted(
        address indexed voter,
        address indexed candidate,
        string candidateName
    );
    event ElectionStarted();
    event ElectionStopped();
    event FundsWithdrawn(address indexed owner, uint amount);

    constructor() {
        i_owner = msg.sender;
        admins[msg.sender] = true; //Owner is an admin by defualt
        adminCount = 1;
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }

    modifier onlyAdmin() {
        if (!admins[msg.sender]) revert NotAdmin();
        _;
    }

    error NotOwner(); // Error to be thrown when a non-owner tries to perform an action.

    error NotAdmin(); // Error to be thrown when a non-admin tries to perform an action. I used custom errors because it is cheaper than using require.

    function addAdmin(address _admin) public onlyOwner {
        require(!admins[_admin], "Already an admin");
        require(adminCount < 5, "Only a maximum of 5 admins are allowed");
        admins[_admin] = true;
        adminCount++;
        emit AdminAdded(_admin);
    }

    function registerAsVoter(
        string memory _name,
        uint8 _age,
        uint256 _nin,
        string memory _nationality
    ) public {
        require(!voters[msg.sender].isRegistered, "Already registered!");
        require(_age >= 18, "You must be at least 18 years old to register!");
        require(
            keccak256(abi.encodePacked(_nationality)) ==
                keccak256(abi.encodePacked("Nigerian")) ||
                keccak256(abi.encodePacked(_nationality)) ==
                keccak256(abi.encodePacked("Nigeria")),
            "Only Nigerians can register to vote!"
        );

        voters[msg.sender] = Voter(
            _name,
            _age,
            _nin,
            _nationality,
            true,
            false
        );

        emit VoterRegistered(msg.sender, _name);
    }

    function registerAsCandidate(
        string memory _name,
        uint8 _age,
        string memory _party,
        string memory _manifesto,
        uint256 _nin
    ) public payable {
        require(
            msg.value == candidateDeposit,
            "Must send exactly 0.01 Eth to qualify!"
        );
        require(_age > 18, "You must be above 18!");
        require(
            !candidates[msg.sender].isRegistered,
            "You are already registered!"
        );

        // Create new candidate
        Candidate memory newCandidate = Candidate(
            msg.sender,
            _name,
            _age,
            _party,
            _manifesto,
            _nin,
            0,
            true,
            false
        );

        // Store in mapping
        candidates[msg.sender] = newCandidate;

        // Add to candidate list
        candidateList.push(newCandidate);

        emit CandidateRegistered(msg.sender, _name);
    }

    function approveCandidate(address _candidate) public onlyAdmin {
        require(candidates[_candidate].isRegistered, "Candidate not found!");
        require(
            !candidates[_candidate].approved,
            "Candidate is already approved!"
        );

        // Update in the mapping
        candidates[_candidate].approved = true;

        // Update in the array for consistency
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i].candidateAddress == _candidate) {
                candidateList[i].approved = true;
                emit CandidateApproved(_candidate, candidateList[i].name);
                break;
            }
        }
    }

    function vote(address _candidate) public {
        require(
            voters[msg.sender].isRegistered,
            "You must be registered to vote!"
        );
        require(!voters[msg.sender].hasVoted, "You have already voted!");
        require(candidateList.length > 0, "No candidates registered yet!");
        require(candidates[_candidate].isRegistered, "Candidate not found!");

        candidates[_candidate].voteCount++;

        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i].candidateAddress == _candidate) {
                candidateList[i].voteCount++;
                voters[msg.sender].hasVoted = true;

                emit Voted(msg.sender, _candidate, candidateList[i].name);
                break;
            }
        }
    }
}
