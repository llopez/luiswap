import { TaskArguments, HardhatRuntimeEnvironment } from "hardhat/types";

export const createPair = async (
  args: TaskArguments,
  { ethers }: HardhatRuntimeEnvironment
) => {
  const { token0, token1, factory } = args;

  const contract = await ethers.getContractAt("UniswapV2Factory", factory);

  await contract.createPair(token0, token1);
};
