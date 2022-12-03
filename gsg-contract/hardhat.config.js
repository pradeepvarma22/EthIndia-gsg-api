require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require("./tasks")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan");


const PRIVATE_KEY = process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "wallaby",
  networks: {
    wallaby: {
      url: "https://wallaby.node.glif.io/rpc/v0",
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URI_KEY,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
		apiKey: process.env.ETHER_SCAN_API_KEY
	},
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./data/cache",
    artifacts: "./data/artifacts"
  },
};