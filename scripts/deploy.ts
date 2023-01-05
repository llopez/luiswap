import { ethers } from "hardhat";

const deployWETH = async (): Promise<string> => {
  const WETH = await ethers.getContractFactory("WETH9");
  const wETH = await WETH.deploy();

  const { address } = await wETH.deployed();

  return address;
};

const deployFactory = async (): Promise<string> => {
  const [owner] = await ethers.getSigners();

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const uniswapV2Factory = await UniswapV2Factory.deploy(owner.address);

  const { address } = await uniswapV2Factory.deployed();

  return address;
};

const deployRouter = async (factory: string, weth: string) => {
  const UniswapV2Router02 = await ethers.getContractFactory(
    "UniswapV2Router02"
  );
  const uniswapV2Router02 = await UniswapV2Router02.deploy(factory, weth);

  const { address } = await uniswapV2Router02.deployed();

  return address;
};

async function main() {
  const weth = await deployWETH();
  const factory = await deployFactory();
  const router = await deployRouter(factory, weth);

  console.log("WETH deployed to: ", weth);
  console.log("UniswapV2Factory deployed to: ", factory);
  console.log("UniswapV2Router02 deployed to: ", router);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
