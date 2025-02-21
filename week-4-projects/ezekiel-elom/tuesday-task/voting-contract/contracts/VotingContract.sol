// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VotingContract {
    struct Voter {
        string fullName;
        uint256 age;
        string nin; 
        string nationality;
        bool hasVoted;
        bool isRegistered;
    }

    struct Contestant {
        string candidateName;
        uint256 candidateAge;
        string politicalParty;
        string manifesto;
        uint256 voteCount;
        bool isRegistered;
    }

    address[] public adminOfficials;
    uint256 public electionStartTime;
    uint256 public electionEndTime;
    address public presidentElect;
    
    mapping(address => Voter) public voters;
    mapping(address => Contestant) public contestants;
    address[] public contestantList;
    address[] public voterList;

    event VoterRegistered(address voter, string fullName);
    event ContestantRegistered(address contestant, string candidateName);
    event VoteCast(address voter, address contestant);
    event ElectionResult(address winner, uint256 voteCount);

    modifier forAdminOnly() {
        require(isAdmin(msg.sender), "Oops, only an admin can perform this action. You want to become an admin?");
        _;
    }

    modifier DuringElectionOnly() {
        require(
            block.timestamp >= electionStartTime && block.timestamp <= electionEndTime,
            "Voting is not active, you have to be patient."
        );
        _;
    }

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "You must be a registered voter.");
        require(!voters[msg.sender].hasVoted, "Hello there, you have already voted.");
        _;
    }

    constructor(address[] memory _adminOfficials, uint256 _electionStartTime, uint256 _electionEndTime) {
        require(_adminOfficials.length == 5, "There must be exactly 5 admin officials.");
        require(_electionStartTime < _electionEndTime, "Invalid election period.");

        adminOfficials = _adminOfficials;
        electionStartTime = _electionStartTime;
        electionEndTime = _electionEndTime;
    }

    function isAdmin(address _user) internal view returns (bool) {
        for (uint i = 0; i < adminOfficials.length; i++) {
            if (adminOfficials[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function registerVoter(
        address _voterAddress,
        string memory _fullName,
        uint256 _age,
        string memory _nin,
        string memory _nationality

    ) public forAdminOnly {
        require(!voters[_voterAddress].isRegistered, "Voter is already registered.");
        require(_age >= 18, "Voter must be at least 18 years old.");
        
        voters[_voterAddress] = Voter(_fullName, _age, _nin, _nationality, false, true);
        voterList.push(_voterAddress);

        emit VoterRegistered(_voterAddress, _fullName);
    }

    function registerContestant(
        address _contestantAddress,
        string memory _candidateName,
        uint256 _candidateAge,
        string memory _politicalParty,
        string memory _manifesto

    ) public {
        require(!contestants[_contestantAddress].isRegistered, "This Contestant has already registered.");
        require(_candidateAge >= 35, "It is a must for Candidate to be at least 35 years old.");
        
        contestants[_contestantAddress] = Contestant(_candidateName, _candidateAge, _politicalParty, _manifesto, 0, true);
        contestantList.push(_contestantAddress);

        emit ContestantRegistered(_contestantAddress, _candidateName);
    }

    function vote(address _contestantAddress) public DuringElectionOnly onlyRegisteredVoter {
        require(contestants[_contestantAddress].isRegistered, "Invalid contestant, did you register?");
        
        voters[msg.sender].hasVoted = true;
        contestants[_contestantAddress].voteCount++;

        emit VoteCast(msg.sender, _contestantAddress);
    }

    function getVoteCount(address _contestantAddress) public view returns (uint256) {
        require(contestants[_contestantAddress].isRegistered, "Invalid contestant, are you sure you registered?.");
        return contestants[_contestantAddress].voteCount;
    }

    function getTotalVotes() public view returns (uint256 totalVotes) {
        for (uint i = 0; i < contestantList.length; i++) {
            totalVotes += contestants[contestantList[i]].voteCount;
        }
    }

    function declareWinner() public {
        require(block.timestamp > electionEndTime, "Please wait as Election is still ongoing.");

        uint256 highestVotes = 0;
        address winner;

        for (uint i = 0; i < contestantList.length; i++) {
            if (contestants[contestantList[i]].voteCount > highestVotes) {
                highestVotes = contestants[contestantList[i]].voteCount;
                winner = contestantList[i];
            }
        }

        presidentElect = winner;
        emit ElectionResult(winner, highestVotes);
    }
}
