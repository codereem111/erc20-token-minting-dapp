const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  it("deploys, has correct name/symbol and owner can mint", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    await token.deployed();

    expect(await token.name()).to.equal("MyToken");
    expect(await token.symbol()).to.equal("MTK");

    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.utils.parseUnits("1000", await token.decimals()));

    // owner mints to addr1
    await token.mint(addr1.address, ethers.utils.parseUnits("100", await token.decimals()));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("100", await token.decimals()));

    // non-owner cannot mint
    await expect(token.connect(addr1).mint(addr1.address, 1)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
