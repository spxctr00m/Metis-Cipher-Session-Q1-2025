const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GrantContract", function () {
    let GrantContract, grantContract, owner, beneficiary, otherAccount;
    const grantAmount = ethers.parseEther("1"); // 1 ETH
    let unlockTime;

    beforeEach(async function () {
        unlockTime = (await ethers.provider.getBlock("latest")).timestamp + 60; // 1 min from latest block
    });    

    beforeEach(async function () {
        [owner, beneficiary, otherAccount] = await ethers.getSigners();
        GrantContract = await ethers.getContractFactory("GrantContract");
        grantContract = await GrantContract.deploy();
        await grantContract.waitForDeployment();
    });

    it("Should allow owner to create a grant", async function () {
        await expect(grantContract.createGrant(beneficiary.address, unlockTime, { value: grantAmount }))
            .to.emit(grantContract, "GrantCreated")
            .withArgs(beneficiary.address, grantAmount, unlockTime);

        const grant = await grantContract.getGrantDetails(beneficiary.address);
        expect(grant[1]).to.equal(grantAmount);
    });

    it("Should not allow a non-owner to create a grant", async function () {
        await expect(
            grantContract.connect(beneficiary).createGrant(beneficiary.address, unlockTime, { value: grantAmount })
        ).to.be.revertedWith("Only owner can perform this action");
    });

    it("Should allow owner to revoke a grant before unlock time", async function () {
        await grantContract.createGrant(beneficiary.address, unlockTime, { value: grantAmount });

        await expect(grantContract.revokeGrant(beneficiary.address))
            .to.emit(grantContract, "GrantRevoked")
            .withArgs(beneficiary.address, grantAmount);
    });

    it("Should not allow a beneficiary to claim grant before unlock time", async function () {
        await grantContract.createGrant(beneficiary.address, unlockTime, { value: grantAmount });

        await expect(grantContract.connect(beneficiary).claimGrant())
            .to.be.revertedWith("Grant is not yet unlocked");
    });

    it("Should allow a beneficiary to claim grant after unlock time", async function () {
        await grantContract.createGrant(beneficiary.address, unlockTime, { value: grantAmount });

        // Increase time to simulate grant unlock
        await ethers.provider.send("evm_increaseTime", [3600]); // Increase by 1 hour
        await ethers.provider.send("evm_mine");

        await expect(grantContract.connect(beneficiary).claimGrant())
            .to.emit(grantContract, "GrantClaimed")
            .withArgs(beneficiary.address, grantAmount);
    });

    it("Should return correct contract balance", async function () {
        await grantContract.createGrant(beneficiary.address, unlockTime, { value: grantAmount });

        const balance = await grantContract.getContractBalance();
        expect(balance).to.equal(grantAmount);
    });

    it("Should return correct time left for a grant", async function () {
        await grantContract.createGrant(beneficiary.address, unlockTime, { value: grantAmount });

        const timeLeft = await grantContract.timeLeftToUnlock(beneficiary.address);
        expect(timeLeft).to.be.greaterThan(0);
    });
});
