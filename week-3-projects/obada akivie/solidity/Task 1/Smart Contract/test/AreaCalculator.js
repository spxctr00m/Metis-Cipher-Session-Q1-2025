const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("AreaCalculator", function () {
  let AreaCalculator;
  let areaCalculator;

  before(async function () {
    AreaCalculator = await ethers.getContractFactory("AreaCalculator");
    areaCalculator = await AreaCalculator.deploy();  // Deploy manually
    await areaCalculator.waitForDeployment(); // Ensure it's deployed
  });

  it("Should return correct Area of Triangle", async function () {
    const base = 35;
    const height = 40;
    const expectedArea = (base * height) / 2;

    const result = await areaCalculator.areaOfATriangle(base, height);
    expect(result).to.equal(expectedArea);
  });

  it("Should return correct  Area Of Rectangle ", async function () {
    const breadth = 35;
    const length = 40;
    const expectedArea = length * breadth;

    const result = await areaCalculator.areaOfARectangle(length, breadth);
    expect(result).to.equal(expectedArea);
  });

 it("Should return correct  Area Of Square ", async function () {
        const length = 5;
        const expectedArea = length**2;
    
        const result = await areaCalculator.areaOfASquare(length,);
        expect(result).to.equal(expectedArea);
  });
});