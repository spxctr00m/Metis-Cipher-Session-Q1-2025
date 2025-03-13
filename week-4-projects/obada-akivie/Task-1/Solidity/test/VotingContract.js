const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NigerianPresidentialElection2027", function () {
    let Election, election, owner, admin1, admin2, voter1, voter2, contestant1, contestant2;
    const startTime = Math.floor(Date.now() / 1000) + 60; // Start in 1 minute
    const endTime = startTime + 600; // Ends in 10 minutes

    beforeEach(async function () {
        [owner, admin1, admin2, voter1, voter2, contestant1, contestant2] = await ethers.getSigners();
        const admins = [owner.address, admin1.address, admin2.address, ethers.ZeroAddress, ethers.ZeroAddress];
        Election = await ethers.getContractFactory("NigerianPresidentialElection2027");
        election = await Election.deploy(admins, startTime, endTime);
        await election.waitForDeployment();
    });

    it("Should register a voter", async function () {
        await election.connect(owner).registerVoter(voter1.address, "John Doe");
        const voter = await election.voters(voter1.address);
        expect(voter.name).to.equal("John Doe");
    });

    it("Should register a contestant", async function () {
        await election.connect(owner).registerContestant(contestant1.address, "Candidate One");
        const contestant = await election.contestants(contestant1.address);
        expect(contestant.name).to.equal("Candidate One");
    });

    it("Should allow voting and track votes", async function () {
        await election.connect(owner).registerVoter(voter1.address, "John Doe");
        await election.connect(owner).registerContestant(contestant1.address, "Candidate One");
        
        // Wait for election to start
        await ethers.provider.send("evm_increaseTime", [61]);
        await ethers.provider.send("evm_mine");

        await election.connect(voter1).vote(contestant1.address);
        const votes = (await election.contestants(contestant1.address)).voteCount;
        expect(votes).to.equal(1);
    });

    it("Should not allow multiple votes from the same voter", async function () {
        await election.connect(owner).registerVoter(voter1.address, "John Doe");
        await election.connect(owner).registerContestant(contestant1.address, "Candidate One");
        
        // Wait for election to start
        await ethers.provider.send("evm_increaseTime", [61]);
        await ethers.provider.send("evm_mine");
        
        await election.connect(voter1).vote(contestant1.address);
        await expect(election.connect(voter1).vote(contestant1.address)).to.be.revertedWith("Already voted");
    });

    it("Should declare the winner after the election ends", async function () {
        await election.connect(owner).registerVoter(voter1.address, "John Doe");
        await election.connect(owner).registerContestant(contestant1.address, "Candidate One");
        
        // Wait for election to start
        await ethers.provider.send("evm_increaseTime", [61]);
        await ethers.provider.send("evm_mine");
        
        await election.connect(voter1).vote(contestant1.address);
        
        // Wait for election to end
        await ethers.provider.send("evm_increaseTime", [601]);
        await ethers.provider.send("evm_mine");

        await election.declareWinner();
        expect(await election.presidentElect()).to.equal(contestant1.address);
    });
});