import { ethers } from "hardhat";
import { assert } from "chai";
import { ModifyVariable } from "../typechain-types";

describe("TestModifyVariable", function () {
  let contract: ModifyVariable;

  before(async () => {
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");
    contract = await ModifyVariable.deploy(10);
    await contract.deployed();
  });

  it("should change x to 1337", async function () {
    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();

    // getter for state variable x
    const newX = await contract.x();

    assert.equal(newX.toNumber(), 1337);
  });
});
