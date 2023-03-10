import { ethers } from "hardhat";
import type { Game1, Game2, Game3, Game4, Game5 } from "../typechain-types";

async function main() {
  const game1 = await deployGame<Game1>("Game1");
  await winGame1(game1);

  const game2 = await deployGame<Game2>("Game2");
  await winGame2(game2);

  const game3 = await deployGame<Game3>("Game3");
  await winGame3(game3);

  const game4 = await deployGame<Game4>("Game4");
  await winGame4(game4);

  const game5 = await deployGame<Game5>("Game5");
  await winGame5(game5);
}

async function deployGame<T>(contractName: string) {
  const Game = await ethers.getContractFactory(contractName);
  const game = await Game.deploy();
  await game.deployed();
  console.log(`${contractName} deployed to address: ${game.address}`);
  return game as T;
}

async function winGame1(game: Game1) {
  const receipt = await (await game.win()).wait();
  console.log("Game1 Win:", receipt.events![0].event === "Winner");
}

async function winGame2(game: Game2) {
  await (await game.setX(25)).wait();
  await (await game.setY(25)).wait();
  const receipt = await (await game.win()).wait();
  console.log("Game2 Win:", receipt.events![0].event === "Winner");
}

async function winGame3(game: Game3) {
  const receipt = await (await game.win(45)).wait();
  console.log("Game3 Win:", receipt.events![0].event === "Winner");
}

async function winGame4(game: Game4) {
  const receipt = await (await game.win(56)).wait();
  console.log("Game4 Win:", receipt.events![0].event === "Winner");
}

async function winGame5(game: Game5) {
  await (await game.giveMeAllowance(10000)).wait();
  await (await game.mint(10000)).wait();
  const receipt = await (await game.win()).wait();
  console.log("Game5 Win:", receipt.events![0].event === "Winner");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
