# Luiswap

Uniswap v2 clone.

> I have created this project for learning. There are 2 more erc20 contracts besides the uniswap-v2 ones. TokenA and TokenB are used to play with the protocol

### Contracts:

- TokenA
- TokenB
- WETH
- UniswapV2ERC20
- UniswapV2Router02
- UniswapV2Pair
- UniswapV2Factory

### Tech Stack:

- Hardhat
- Solidity
- TypeScript

### Installation:

```shell
git clone https://github.com/llopez/luiswap
cd luiswap
yarn install
```

### Testing:

```shell
yarn test
```

### Development:

```shell
# start local blockchain
yarn chain
# deploy contracts to local blockchain
yarn local:deploy
# start local web3 console
yarn local:console
```

### Tasks:

Some tasks to play with the smart contracts without an UI

- createPair
- addLiquidity
