import { ethers } from "hardhat";

async function main() {
  const initialSupply = ethers.utils.parseEther("1337");

  const LabaToken = await ethers.getContractFactory("LabaToken");
  const labaToken= await LabaToken.deploy(initialSupply);

  await labaToken.deployed();

  console.log(`Token deployed to ${labaToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
