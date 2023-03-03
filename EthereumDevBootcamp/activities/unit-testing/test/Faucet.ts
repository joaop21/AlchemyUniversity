import { TransactionReceipt } from "@ethersproject/providers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { Faucet__factory } from "../typechain-types";

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function faucetWithEthFixture() {
    return faucetFixture({ value: parseUnits("10", "ether") });
  }

  async function faucetFixture(
    ...[overrides]: Parameters<typeof Faucet__factory.prototype.deploy>
  ) {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy(overrides ?? {});

    const [owner, alice] = await ethers.getSigners();

    return { faucet, owner, alice };
  }

  it("should deploy and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(faucetFixture);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  describe("withdraw", () => {
    it("should revert when the Faucet does not have funds", async function () {
      const { faucet } = await loadFixture(faucetFixture);

      await expect(faucet.withdraw(parseUnits("0.1", "ether"))).to.be.reverted;
    });

    it("should not allow withdrawals above .1 ETH at a time", async function () {
      const { faucet } = await loadFixture(faucetWithEthFixture);

      const withdrawAmount = parseUnits("1", "ether");

      await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
    });

    it("should allow withdrawals equals to .1 ETH", async function () {
      const { faucet, owner } = await loadFixture(faucetWithEthFixture);
      const balance = await owner.getBalance();

      const withdrawAmount = parseUnits("0.1", "ether");
      const receipt = await (await faucet.withdraw(withdrawAmount)).wait();

      expect(await owner.getBalance()).to.equal(
        balance.add(withdrawAmount).sub(txCost(receipt))
      );
    });

    it("should allow withdrawals below .1 ETH", async function () {
      const { faucet, owner } = await loadFixture(faucetWithEthFixture);
      const balance = await owner.getBalance();

      const withdrawAmount = parseUnits("0.01", "ether");
      const receipt = await (await faucet.withdraw(withdrawAmount)).wait();

      expect(await owner.getBalance()).to.equal(
        balance.add(withdrawAmount).sub(txCost(receipt))
      );
    });
  });

  describe("withdrawAll", () => {
    it("should revert if the sender is not the owner", async () => {
      const { faucet, alice } = await loadFixture(faucetWithEthFixture);

      await expect(faucet.connect(alice).withdrawAll()).to.be.reverted;
    });

    it("should send all the ETH to the owner", async () => {
      const { faucet, owner } = await loadFixture(faucetWithEthFixture);
      const faucetBalance = await faucet.provider.getBalance(faucet.address);
      const ownerBalance = await owner.getBalance();

      const receipt = await (await faucet.withdrawAll()).wait();

      expect(await faucet.provider.getBalance(faucet.address)).to.equal(
        BigNumber.from(0)
      );
      expect(await owner.getBalance()).to.equal(
        ownerBalance.add(faucetBalance).sub(txCost(receipt))
      );
    });
  });

  describe("destroyFaucet", () => {
    it("should revert if the sender is not the owner", async () => {
      const { faucet, alice } = await loadFixture(faucetWithEthFixture);

      await expect(faucet.connect(alice).destroyFaucet()).to.be.reverted;
    });

    it("should destroy the contract and send the balance to the owner", async () => {
      const { faucet } = await loadFixture(faucetWithEthFixture);

      await (await faucet.destroyFaucet()).wait();
      const code = await faucet.provider.getCode(faucet.address);

      expect(code).to.equal("0x");
    });
  });
});

function txCost(receipt: TransactionReceipt) {
  return receipt.effectiveGasPrice.mul(receipt.gasUsed);
}
