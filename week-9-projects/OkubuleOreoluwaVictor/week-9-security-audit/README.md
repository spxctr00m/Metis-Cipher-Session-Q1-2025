SMART CONTRACT APPLICATION REVIEW!
This Readme highlights the new implementation of security vulnerabilities found in implemented smart so far!


CONTRACT REVIEW: WEEK 3
After review The contract implemented in week 3 proves to be secure and free from vulnerabilities as it only consists of pure functions which do not modify state.



CONTRACT REVIEW: WEEK 4 VOTING CONTRACT.

 After a careful analysis of the implementation of the voting contract created in week 4, several vulnerabilities, security, gas and contract integrity risks were found which lead to  a very much stronger implementation of this contract.


The following are Fixes in the contract which were missing in the first implementation, They include: 
  
1) implementation of a Role control/ownership:

 -The contract now includes a constructor that deploys the contract with the address of its creator or author tagged as a "proprietor" and this ignition address is saved in a proprietor mapping. 



mapping ( uint8 => address) proprietor;
mapping (uint8 => address) public Admin;

constructor( address proprietor_ ){

   proprietor[1] = proprietor_;

}

- implementation of 1-4 possible proprietors that have ultimate role control to the code and implement restricted functionalities. only a proprietor can add a new proprietor.


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


  function addproprietor(address new_propietor,uint8 num)onlyproprietor public
  {
    require(num < 5, "can't have more than four proprietors on this contract");
    proprietor[num] = new_proprietor;
  }




2) implementation of Admins and onlyadmin modifiers: Admins can only be created by propietors and only Admins have access to register voter who have applied for elegibility to be registered to vote.



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



3) implementation of a new function where voters can only apply for registration to vote and only admins can finalise and register voters to the registered voters backend.

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


4) implementation Reentrancy checks with multiple require condtional statements to the voting function to check eligbility status and precision of a voter casting their vote.


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



Conclusion: with all these new implementations, Transparency and security from malicious attacks are now more secure than ever before on the contract. a more secure and compact program can be generated.
