const { expect } = require("chai");

describe("AreaCalculator", function () {
  let AreaCalculator, areaCalculator;

  before(async function () {
    // Deploy the contract before running tests
    AreaCalculator = await ethers.getContractFactory("AreaCalculator");
    areaCalculator = await AreaCalculator.deploy();
  });

  it("should correctly calculate the area of a triangle", async function () {
    const base = 10;
    const height = 20;
    const expectedArea = (base * height) / 2;
    
    expect(await areaCalculator.triangleArea(base, height)).to.equal(expectedArea);
  });

  it("should correctly calculate the area of a rectangle", async function () {
    const length = 40;
    const breadth = 5;
    const expectedArea = length * breadth;
    
    expect(await areaCalculator.rectangleArea(length, breadth)).to.equal(expectedArea);
  });

  it("should correctly calculate the area of a square", async function () {
    const side = 30;
    const expectedArea = side * side;
    
    expect(await areaCalculator.squareArea(side)).to.equal(expectedArea);
  });

  it("should revert if triangle base or height is zero", async function () {
    await expect(areaCalculator.triangleArea(0, 10)).to.be.revertedWith("Base and height must be greater than zero");
    await expect(areaCalculator.triangleArea(10, 0)).to.be.revertedWith("Base and height must be greater than zero");
  });

  it("should revert if rectangle length or breadth is zero", async function () {
    await expect(areaCalculator.rectangleArea(0, 10)).to.be.revertedWith("Length and breadth must be greater than zero");
    await expect(areaCalculator.rectangleArea(10, 0)).to.be.revertedWith("Length and breadth must be greater than zero");
  });

  it("should revert if square side is zero", async function () {
    await expect(areaCalculator.squareArea(0)).to.be.revertedWith("Side must be greater than zero");
  });
});
