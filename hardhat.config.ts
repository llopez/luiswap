import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.4.18" },
      { version: "0.5.16" },
      {
        version: "0.6.6",
        settings: { optimizer: { enabled: true, runs: 1000 } },
      },
      { version: "0.8.9" },
    ],
  },
};

export default config;
