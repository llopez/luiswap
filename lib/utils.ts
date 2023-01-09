import { ethers } from "hardhat";

const deployTokenA = async (): Promise<string> => {
  const TokenA = await ethers.getContractFactory("TokenA");

  const initialSupply = ethers.utils.parseEther("5000");

  const tokenA = await TokenA.deploy(initialSupply);

  const { address } = await tokenA.deployed();

  return address;
};

const deployTokenB = async (): Promise<string> => {
  const TokenB = await ethers.getContractFactory("TokenB");

  const initialSupply = ethers.utils.parseEther("5000");

  const tokenB = await TokenB.deploy(initialSupply);

  const { address } = await tokenB.deployed();

  return address;
};

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

interface AddressDirectory {
  tokenA: string;
  tokenB: string;
  weth: string;
  factory: string;
  router: string;
}

export const deployAll = async (): Promise<AddressDirectory> => {
  const tokenA = await deployTokenA();
  const tokenB = await deployTokenB();
  const weth = await deployWETH();
  const factory = await deployFactory();
  const router = await deployRouter(factory, weth);

  return {
    tokenA,
    tokenB,
    weth,
    factory,
    router,
  };
};
