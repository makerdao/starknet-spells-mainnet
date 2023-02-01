import "@nomiclabs/hardhat-ethers";
import "@shardlabs/starknet-hardhat-plugin";

const config = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    devnet: {
      //starknet devnet endpoint
      url: "http://127.0.0.1:5050",
    },
  },
  starknet: {
    dockerizedVersion: "0.10.3",
    network: "devnet",
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./src",
    tests: "./src",
    starknetSources: "./src",
    starknetArtifacts: "./starknet-artifacts",
  },
};

export default config;
