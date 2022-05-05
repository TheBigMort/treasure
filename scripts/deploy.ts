/* eslint-disable no-console */
import { execSync } from 'child_process';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as hre from 'hardhat';
import conArgs from '../contract.config';

async function main() {
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
