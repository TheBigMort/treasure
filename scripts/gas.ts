/* eslint-disable import/no-extraneous-dependencies */
import { ethers } from 'hardhat';

(async () => {
    const price = await ethers.provider.getGasPrice();
    console.log(price);
})();
