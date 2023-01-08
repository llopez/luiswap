import { task } from "hardhat/config";
import { createPair } from "./create-pair";
import { addLiquidity } from "./add-liquidity";

task("create-pair", "Creates a pool for token0 and token1")
  .addParam("token0")
  .addParam("token1")
  .addParam("factory")
  .setAction(createPair);

task("add-liquidity", "Adds liquidity to a pool")
  .addParam("token0")
  .addParam("token1")
  .addParam("amount0")
  .addParam("amount1")
  .addParam("router")
  .setAction(addLiquidity);
