import { expect } from "chai";
import { ethers } from "hardhat";
import { deployAll } from "../lib/utils";

describe("UniswapV2Router02", () => {
  const deployContract = async () => {
    const [deployer, account1, account2] = await ethers.getSigners();

    const {
      router: routerAddress,
      tokenA: token0Address,
      tokenB: token1Address,
      factory: factoryAddress,
    } = await deployAll();

    const tokenA = await ethers.getContractAt("TokenA", token0Address);
    const tokenB = await ethers.getContractAt("TokenB", token1Address);

    const router = await ethers.getContractAt(
      "UniswapV2Router02",
      routerAddress
    );

    const factory = await ethers.getContractAt(
      "UniswapV2Factory",
      factoryAddress
    );

    return { deployer, account1, account2, tokenA, tokenB, factory, router };
  };

  describe("addLiquidity", () => {
    it("updates reserves and totalSupply", async () => {
      const { deployer, router, tokenA, tokenB, factory } =
        await deployContract();

      const amount0 = ethers.utils.parseEther("100");
      const amount1 = ethers.utils.parseEther("50");
      const deadline =
        (await deployer.provider!.getBlock("latest")).timestamp + 1000;

      await factory.createPair(tokenA.address, tokenB.address);
      await tokenA.approve(router.address, amount0);
      await tokenB.approve(router.address, amount1);

      await router.addLiquidity(
        tokenA.address,
        tokenB.address,
        amount0,
        amount1,
        0,
        0,
        deployer.address,
        deadline
      );

      const pairAddress = await factory.getPair(tokenA.address, tokenB.address);

      const pair = await ethers.getContractAt("UniswapV2Pair", pairAddress);

      const totalSupply = ethers.BigNumber.from("70710678118654752440");

      expect(await pair.totalSupply()).to.be.eq(totalSupply);

      const minLiquidity = await pair.MINIMUM_LIQUIDITY();

      expect(await pair.balanceOf(deployer.address)).to.be.eq(
        totalSupply.sub(minLiquidity)
      );

      // Reserves
      const [reserve0, reserve1] = await pair.getReserves();
      expect(reserve0).to.be.eq(amount0);
      expect(reserve1).to.be.eq(amount1);
    });
  });
});
