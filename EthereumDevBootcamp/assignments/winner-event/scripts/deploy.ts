import { ethers } from "hardhat";

async function main() {
  const WinnerEmitter = await ethers.getContractFactory("WinnerEmitter");
  const winnerEmitter = await WinnerEmitter.deploy(
    "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502"
  );

  await winnerEmitter.deployed();

  console.log(`Winner Emitter deployed to ${winnerEmitter.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
