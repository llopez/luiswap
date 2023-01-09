import { deployAll } from "../lib/utils";

async function main() {
  const { tokenA, tokenB, weth, factory, router } = await deployAll();

  const data = {
    tokenA: { address: tokenA },
    tokenB: { address: tokenB },
    weth: { address: weth },
    factory: { address: factory },
    router: { address: router },
  };

  console.table(data);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
