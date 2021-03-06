require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC || "https://eth-rinkeby";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "etherscan_key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "coinmarketcap_api_key";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby:{
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    }
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter:{
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR", //To get gas value in USD/INR or any other currency we need the API key of CoinMarketCap
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  }
  
};
