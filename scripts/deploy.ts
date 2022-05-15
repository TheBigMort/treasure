/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { execSync } from 'child_process';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import * as hre from 'hardhat';
import { ethers } from 'hardhat';
import conArgs from '../contract.config';

const maxGas = 30;
async function waitForGasPriceBelow(max: BigNumber): Promise<BigNumber> {
    console.log('Waiting for gas price below', formatUnits(max, 'gwei'), 'gwei');
    while (true) {
        const price = await ethers.provider.getGasPrice();
        console.log(new Date().toLocaleString(), 'Gas Price:', formatUnits(price, 'gwei'), 'gwei');
        if (price.lte(max)) {
            console.log('Good enough!');
            return price;
        }
        await new Promise((resolve) => setTimeout(resolve, 15_000));
    }
}
async function main() {
    await waitForGasPriceBelow(parseUnits(maxGas.toString(), 'gwei'));

    console.log('Deploying');
    const Con = await hre.ethers.getContractFactory('Treasure');
    console.log('Got Factory');
    const con = await Con.deploy(...conArgs);
    console.log('Contract Deployed');
    if (hre.network.name !== 'hardhat') {
        console.log('Waiting for 5 Confirmations');
        await con.deployTransaction.wait(5);
    }

    console.log('Treasure deployed to:', con.address);
    console.log('Verifying...');
    const verCommand: string = `npx hardhat verify --network ${hre.network.name} ${con.address} --constructor-args ./contract.config.ts`;
    const output = execSync(verCommand, { encoding: 'utf-8' });
    console.log(output);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
