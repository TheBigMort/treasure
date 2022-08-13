/* eslint-disable import/no-extraneous-dependencies */
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ganache';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-web3';
import * as dotenv from 'dotenv';
import 'hardhat-gas-reporter';
import 'hardhat-watcher';
import 'solidity-coverage';

dotenv.config();
const config = {
    constructArgsPath: './constructArgs.ts',
    solidity: {
        version: '0.8.13',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY,
    },
    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
        artifacts: './artifacts',
    },
    mocha: {
        timeout: 500000,
    },
    networks: {
        hardhat: {},
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
            accounts: [],
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
            accounts: [],
        },
    },
    gasReporter: {
        currency: 'USD',
        coinmarketcap: process.env.CMC_API_KEY,
    },
    watcher: {
        ci: {
            tasks: [
                'clean',
                { command: 'compile', params: { quiet: true } },
                {
                    command: 'coverage',
                    params: { noCompile: true, testFiles: ['test/testfile.ts'] },
                },
            ],
        },
    },
};
export default config;
