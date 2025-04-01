// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MYSimpleVotingPrototype {

mapping ( uint8 => address) proprietor;
mapping (uint8 => address) public Admin;


constructor( address proprietor_ ){

   proprietor[1] = proprietor_;

}
 modifier onlyproprietor(){
    uint8 i =1;
    while (i < 4){
        if(proprietor[i] != msg.sender){
            i++;
        }
    require( proprietor[i] == msg.sender,"only a propietor can author this call");
            _;
    }
  }

  function addproprietor(address new_proprietor,uint8 num)onlyproprietor public
  {
    require(num < 5, "can't have more than four propietors on this contract");
    proprietor[num] = new_proprietor;
  }

function createAdmin(address _admin,uint8 num)onlyproprietor public{
   Admin[num]= _admin;
  }

 modifier onlyadmin(){
    uint8 i =1;
    while (i < 20){
        if(Admin[i] != msg.sender){
            i++;
        }
    require( Admin[i] == msg.sender,"only an administrator can author this call");
            _;
    }
  }



    struct RegisterVoter {
        string votername;
        uint256 age;
        uint256 NationalID_no;
        string politicalparty;
        address voteraddr;
    }
 
  

    mapping ( address => RegisterVoter) public voter_list;
    mapping(address => RegisterVoter) public RegisteredVoter;
    mapping(address => bool) public voted;
   
    
  function Voter_Application(address voteraddr, string memory _name,uint256 age,uint256 nationalID_no,string memory _politicalparty)
   public{  
         require(msg.sender == voteraddr,"You do not own this address!");
         voter_list[voteraddr] = RegisterVoter( _name,age,nationalID_no,_politicalparty,msg.sender); 

   }

    function Registervoter(address voter_)onlyadmin
    public{
        require(voter_list[voter_].voteraddr == voter_, "This address has not applied as a voter, please confirm address!");
        RegisteredVoter[voter_] = voter_list[voter_];
        }
       
      
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
        string politicalparty;
    }


  
    mapping(uint256 => Candidate) public candidates;



    event VotedEvent(uint256 indexed candidateId);

    function addCandidate(string memory _name, string memory _politicalparty, uint _id)onlyadmin public {

        candidates[_id] = Candidate(
            _id,
            _name,
            0,
            _politicalparty
        );
    }
    function getCandidate(uint256 _candidateId) public view returns (uint256,string memory,uint256,string memory) {
        require(_candidateId > 0 && _candidateId == candidates[_candidateId].id, "Invalid candidate ID.");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount, candidate.politicalparty);
    }


    function vote(uint256 _candidateId, address _voter,uint256 _nationalID, string memory _voterparty )public {

           require(_voter == msg.sender,"You do not own this voting address!");

           require(RegisteredVoter[_voter].NationalID_no == _nationalID , "You are not a registered voter, you cannot vote!");
               
           require(keccak256(abi.encodePacked(_voterparty)) == keccak256(abi.encodePacked(RegisteredVoter[_voter].politicalparty)),
           "You are not registered to the selected party!");

           require(_candidateId > 0 && _candidateId == candidates[_candidateId].id, "Invalid candidate ID.");
       
           
         require(keccak256(abi.encodePacked(_voterparty)) == keccak256(abi.encodePacked(candidates[_candidateId].politicalparty)),
                "Voter can only vote for candidates from their political party");

             require(!voted[_voter], "You have already voted in this category!.");
    
        voted[_voter] = true;
        candidates[_candidateId].voteCount++;
        emit VotedEvent(_candidateId);
    }
}
