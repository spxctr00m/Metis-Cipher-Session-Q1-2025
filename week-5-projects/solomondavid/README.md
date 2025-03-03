<h3> Contract Address </h3>
0xd50CD3b69371fc4cE2f6eF80fEf277d4cd6372d4

<h3> Deployment Steps </h3>
<ul>
	<li>Initialize a new hardhat project <br>
		<code>npx hardhat init</code>
	</li>

	<li>Install the needed packages (nomicfoundation, openzeppelin/contracts, dotenv) </li>

	<li>Create the contract</li>
	
	<li> Create an ignition module for the contract </li>

	<li> Run the following commands <br> 
		<code> npx hardhat compile </code>
		<code> npx hardhat ignition deploy "ignition/modules/grantContract.js" --network metis </code>
	<li> 
	
</ul>

# **GrantContract - Summary**

- **ERC-20 token contract** with time-locked grants.  
- **Owner creates grants** for beneficiaries with a set unlock time.  
- **Beneficiary withdraws tokens** only after unlock time.  
- **Owner can revoke grant** before unlock time, reclaiming tokens.  
- **Functions to check:**  
  - Grant details for a beneficiary.  
  - Total contract token balance.  
  - Time left before grant release.  
- **Ensures secure, time-based fund distribution.**  
