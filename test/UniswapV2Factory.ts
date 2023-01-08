import { expect } from "chai";
import { ethers } from "hardhat";

describe("UniswapV2Factory", () => {
  const deployContract = async () => {
    const [, account2] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("UniswapV2Factory");
    const contract = await Contract.deploy(account2.address);

    return { contract, account2 };
  };

  describe("createPair", () => {
    it("does something", async () => {
      const { contract } = await deployContract();

      const tokenA = "0x0000000000000000000000000000000000000001";
      const tokenB = "0x0000000000000000000000000000000000000002";

      expect(await contract.createPair(tokenA, tokenB)).to.emit(
        contract,
        "PairCreated"
      );
    });
  });
});
