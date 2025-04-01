const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with address:", deployer.address);

    const Election = await ethers.getContractFactory("NigerianPresidentialElection2027");
    const admins = [
        deployer.address,
        "0xAdminAddress1", // Replace with actual admin addresses
        "0xAdminAddress2",
        "0xAdminAddress3",
        "0xAdminAddress4",
    ];
    const startTime = Math.floor(Date.now() / 1000) + 60; // Start in 1 min
    const endTime = startTime + 600; // Ends in 10 mins

    const election = await Election.deploy(admins, startTime, endTime);
    await election.waitForDeployment();

    console.log("Election contract deployed at:", election.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
