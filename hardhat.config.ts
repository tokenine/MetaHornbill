// import { config as dotenvConfig } from "dotenv";
import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
// import { NetworkUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import 'hardhat-deploy-ethers';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import "hardhat-contract-sizer";
import 'hardhat-deploy';
import "solidity-coverage"
import 'hardhat-tracer';
import "hardhat-log-remover"
import "hardhat-storage-layout"
import "@tenderly/hardhat-tenderly"


import {node_url, accounts, addForkConfiguration} from './utils/network';

import tasks from './tasks'
for (const tsk of tasks) { tsk() }


// const PRIVATE_KEY = process.env.PKEY;
// const MNEMONIC = process.env.MNEMONIC;
const ETHERSCAN_KEY = process.env.ETHERSCANKEY;

const config: HardhatUserConfig = {


  solidity: {

    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          outputSelection: {
            "*": {
                "*": ["storageLayout"],
            },
          },
        }
      },

      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },

      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
      
    ],


  },
  namedAccounts: {
    deployer: 0,
    dev: 1,
    buyer: 2,
    user: 3,


    zero: "0x0000000000000000000000000000000000000000",
     ///-------------------/deploy---tokens-------------------///

    

     lp_reciever: {
      31337: 4, 
      56: "0x0000000000000000000000000000000000000000", //TODO : Add
      97: 4,
    },

    busd: {
      31337: "0xe9e7cea3dedca5984780bafc599bd69add087d56", 
      56: "0xe9e7cea3dedca5984780bafc599bd69add087d56", //Mapped from  https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56
      97: "0x2a7b39f35fA3e0bFBFD0136E43Cb9c7feb6625Cc",
    },

    


  },


  networks: addForkConfiguration({
    hardhat: {
      initialBaseFeePerGas: 0, // to fix : https://github.com/sc-forks/solidity-coverage/issues/652, see https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
      tags: ['test']
    },
    localhost: {
      url: node_url('localhost'),
      accounts: accounts(),
    },
    staging: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
    production: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
    kovan: {
      url: node_url('kovan'),
      accounts: accounts('kovan'),
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
    },

    bscmainnet: {
      // url: "https://bsc-dataseed.binance.org/",
      url: node_url('bscmainnet'),
      accounts: accounts('bscmainnet'),
      chainId: 56,
      gasPrice: 5000000000,

      throwOnTransactionFailures: false,
      // if true,  throw stack traces on transaction failures.
      // If false, return  failing transaction hash.
      throwOnCallFailures: true,
      // If is true, will throw  stack traces when a call fails.
      // If false, will return the call's return data, which can contain a revert reason
      tags: ['production'],
    },

    bscmainnetfork: {
      url: node_url('bscmainnetfork'),
      accounts: accounts('bscmainnetfork'),
      tags: ['fork']
    },

    bsctestnet: {
      url: node_url('bsctestnet'),
      accounts: accounts('bsctestnet'),
      chainId: 97,
      gasPrice: 10000000000,

      tags: ["staging"]

    },

    bkctestnet: {
      url: node_url('bkctestnet'),
      accounts: accounts('bkctestnet'),
      chainId: 25925,
      gasPrice: 10000000000,

      tags: ["staging"]

    },

    // bscTestnet2: {
    //   url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
    //   // url: "https://data-seed-prebsc-1-s2.binance.org:8545/",
    //   chainId: 97,
    //   gasPrice: 10000000000,
    //   // accounts: [`0x${PRIVATE_KEY}`]
    //   accounts: {
    //     count: 10,
    //     initialIndex: 0,
    //     mnemonic: `${MNEMONIC}`,
    //     path: "m/44'/60'/0'/0",
    //   },

    //   tags: ["staging"]

    // },


  }),


  external: process.env.HARDHAT_FORK
  ? {
      deployments: {
        // process.env.HARDHAT_FORK will specify the network that the fork is made from.
        // these lines allow it to fetch the deployments from the network being forked from both for node and deploy task
        hardhat: ['deployments/' + process.env.HARDHAT_FORK],
        localhost: ['deployments/' + process.env.HARDHAT_FORK],
      },
    }
  : undefined,

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_KEY 
  },


  paths: {
    sources: './contracts',
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deploy: './deploy',
    deployments: './deployments',
    imports: './imports'
  },

  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },

  mocha: {
    timeout: 300000
  },
  
  
  
};

export default config;