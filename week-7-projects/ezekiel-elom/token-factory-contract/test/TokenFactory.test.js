const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenFactory", function () {
  let TokenFactory, tokenFactory, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy the TokenFactory contract
    TokenFactory = await ethers.getContractFactory("TokenFactory");
    tokenFactory = await TokenFactory.deploy();
    await tokenFactory.waitForDeployment();
  });

  it("Should deploy TokenFactory successfully", async function () {
    expect(await tokenFactory.getAddress()).to.not.equal(ethers.ZeroAddress);
  });

  it("Should create a new ERC-20 token", async function () {
    const tx = await tokenFactory.createToken("TestToken", "TTK", ethers.parseEther("1000"));
    await tx.wait(); // Wait for the transaction to be mined

    // Get deployed token address
    const deployedTokens = await tokenFactory.getDeployedTokens();
    expect(deployedTokens.length).to.equal(1);
    
    // Check that the deployed token exists
    const tokenAddress = deployedTokens[0];
    expect(tokenAddress).to.not.equal(ethers.ZeroAddress);

    // Verify token details
    const CustomToken = await ethers.getContractFactory("CustomToken");
    const token = await CustomToken.attach(tokenAddress);

    expect(await token.name()).to.equal("TestToken");
    expect(await token.symbol()).to.equal("TTK");
    expect(await token.totalSupply()).to.equal(ethers.parseEther("1000"));
    expect(await token.balanceOf(owner.address)).to.equal(ethers.parseEther("1000"));
  });

  it("Should allow multiple users to create different tokens", async function () {
    await tokenFactory.connect(owner).createToken("OwnerToken", "OTK", ethers.parseEther("500"));
    await tokenFactory.connect(addr1).createToken("UserToken", "UTK", ethers.parseEther("1000"));

    const deployedTokens = await tokenFactory.getDeployedTokens();
    expect(deployedTokens.length).to.equal(2);
  });

  it("Should emit an event when a token is created", async function () {
    await expect(tokenFactory.createToken("EventToken", "ETK", ethers.parseEther("2000")))
      .to.emit(tokenFactory, "TokenCreated");
  });
});
