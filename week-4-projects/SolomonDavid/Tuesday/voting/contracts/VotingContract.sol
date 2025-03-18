// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VotingContract {
    struct Voter {
        string name;
        uint8 age;
        string nationality;
        bool voted;
        bool isEligible;
    }

    struct Contestant {
        string name;
        uint8 age;
        string party;
        string manifesto;
    }


    uint32 public numOfVotes;
    uint public votingStartTime;
    uint public votingEndTime;
    bool public votingActive;
    string private presidentElect;

    address[] public admins; // Stores the first 5 callers as admins
    Contestant[] public contestants; // Contestant list
    Voter[] public voters; // Voter list stored in an array
    mapping(uint => uint) public votes; // Votes stored by contestant index


    constructor() {
        registerAsAdmin();
    }

    //modifiers
    modifier onlyAdmin() {
        bool found = false;
        for (uint i = 0; i < admins.length; i++) {
            if (msg.sender == admins[i]) {
                found = true;
                break;
            }
        }
        require(found, "You're not an admin");
        _;
    }

    modifier checkElection(){
        if((votingStartTime != 0) && (votingStartTime < block.timestamp) && (votingEndTime > block.timestamp)){
            votingActive = true;
        }
        else{
            votingActive = false;
        }
        _;
    }

    function votingStartInMinutes(uint _votingStart) external checkElection returns (string memory){
        require(!votingActive, "Can't change start time during election");
        votingStartTime = block.timestamp + (_votingStart * 60);
        return string(abi.encodePacked("Election starting in ", _votingStart, " minutes."));
    }

    function votingEndInMinutes(uint _votingEnd) external returns (string memory){
        require(votingStartTime != 0, "Set start time first");
        votingEndTime = votingStartTime + (_votingEnd * 60);
        return string(abi.encodePacked("Election will last ", _votingEnd, "minutes."));
    }

    

    function registerAsAdmin() public {
        require(admins.length < 5, "Admin limit reached");
        for (uint i = 0; i < admins.length; i++) {
            require(admins[i] != msg.sender, "Admin already registered");
        }
        admins.push(msg.sender);
    }

    function addContestant(
        string calldata name,
        uint8 age,
        string calldata party,
        string calldata manifesto
    ) public onlyAdmin checkElection returns (string memory){
        require(!votingActive, "Can't add contestants during election");
        for (uint i = 0; i < contestants.length; i++) {
            require(
                keccak256(abi.encodePacked(contestants[i].name)) != keccak256(abi.encodePacked(name)),
                "Contestant with same name exists"
            );
            require(
                keccak256(abi.encodePacked(contestants[i].party)) != keccak256(abi.encodePacked(party)),
                "One contestant per party"
            );
        }

        contestants.push(Contestant(name, age, party, manifesto));
        return "success";
    }

    function registerVoter(string calldata name, uint8 age, string calldata nationality) public onlyAdmin checkElection returns (string memory) {
        require(age >= 18, "Voter must be at least 18");
        voters.push(Voter(name, age, nationality, false, true));
        return string(abi.encodePacked("Success! Your ID is ", voters.length - 1)); // Return voter index
    }

    function vote(uint voterIndex, uint contestantIndex) public checkElection{
        require(votingActive , "No election ongoing");
        require(voterIndex < voters.length, "Invalid voter index");
        require(voters[voterIndex].isEligible, "Voter is not eligible");
        require(!voters[voterIndex].voted, "Voter has already voted");
        require(contestantIndex < contestants.length, "Invalid contestant index");

        voters[voterIndex].voted = true;
        votes[contestantIndex]++;
        numOfVotes++;
    }

    function startElectionNow() public onlyAdmin returns (bool) {
        require(!votingActive, "Election already started");
        votingStartTime = block.timestamp;
        votingActive = true;
        return votingActive;

    }

    function endElection() public onlyAdmin checkElection{
        require(votingActive, "No Election");
        votingEndTime = block.timestamp;
        votingActive = false;
        uint winningVoteCount = 0;
        uint winningIndex = 0;
        bool tie = false;

        for (uint i = 0; i < contestants.length; i++) {
            if (votes[i] > winningVoteCount) {
                winningVoteCount = votes[i];
                winningIndex = i;
                tie = false;
            } else if (votes[i] == winningVoteCount && votes[i] > 0) {
                tie = true;
            }
        }
        require(!tie, "Election ended in a tie, manual decision needed");
         presidentElect = contestants[winningIndex].name;
    }

    function showWinner() public view returns(string memory){
        return presidentElect;
    }

        

}