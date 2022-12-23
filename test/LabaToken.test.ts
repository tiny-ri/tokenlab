import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";



describe("LabaToken", function () {

  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("LabaToken");
    const [owner] = await ethers.getSigners();

    const initialSupply = ethers.utils.parseEther("1337");

    const labaToken = await Token.deploy(initialSupply);

    await labaToken.deployed();

    return { Token, labaToken, owner, initialSupply };

  }

  describe("Deployment", function (){
    
    it("Should set the right owner", async function () {

      const { labaToken, owner } = await loadFixture(deployTokenFixture);

      expect(await labaToken.owner()).to.equal(owner.address);
      
    });

    it("Should assign the total supply of tokens to the owner", async function () {

      const { labaToken, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await labaToken.balanceOf(owner.address);
      expect(await labaToken.totalSupply()).to.equal(ownerBalance);
      
    });

    it("Should have the correct initial supply", async function () {

      const { labaToken, owner, initialSupply} = await loadFixture(deployTokenFixture);
  
      expect(await labaToken.totalSupply()).to.equal(initialSupply);
    });

  });
    
});