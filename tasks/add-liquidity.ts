import { TaskArguments, HardhatRuntimeEnvironment } from "hardhat/types";

export const addLiquidity = async (
  args: TaskArguments,
  { ethers }: HardhatRuntimeEnvironment
) => {
  const { router, token0, token1, amount0, amount1 } = args;

  const [owner] = await ethers.getSigners();

  const timestamp = (await owner.provider?.getBlock("latest"))?.timestamp;

  const contract = await ethers.getContractAt("UniswapV2Router02", router);

  const tokenA = await ethers.getContractAt("TokenA", token0);
  const tokenB = await ethers.getContractAt("TokenB", token1);

  await tokenA.approve(contract.address, ethers.utils.parseEther(amount0));
  await tokenB.approve(contract.address, ethers.utils.parseEther(amount1));

  await contract.addLiquidity(
    token0,
    token1,
    ethers.utils.parseEther(amount0),
    ethers.utils.parseEther(amount1),
    ethers.utils.parseEther(amount0),
    ethers.utils.parseEther(amount1),
    owner.address,
    timestamp! + 1000
  );
};
