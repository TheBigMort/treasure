import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import cliProgress from 'cli-progress';
import * as dotenv from "dotenv";
import { Contract, ContractFactory } from "ethers";
import { parseEther } from "ethers/lib/utils";
import * as fs from "fs";
import * as hre from "hardhat";
import { Map as IMap } from "immutable";
import { conConfig } from '../contract.config';
dotenv.config();

const price: number = parseFloat(conConfig.conParams.price);
const getRandInt = (max: number) => Math.floor(Math.random() * max);
const buildMint = (con: Contract, numMints: number) => {
  const overrides = {
    value: parseEther(price.toString()).mul(numMints),
  };
  return con.plunder(numMints, overrides);
};
describe("Test all", () => {
  let t4w: Contract;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    try {

      signers = await hre.ethers.getSigners();

      const Treasure: ContractFactory = await hre.ethers.getContractFactory(
        "Treasure",
        signers[0]
      );

      t4w = await Treasure.deploy(...conConfig.conArgs);
      await t4w.deployed();
    } catch (e) {
      console.error(e);
    }
  });
  it("get big data", async () => {
    
    const numMints = 1000;
    const chests: string[][] = [];
    const bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    bar.start(numMints, 0);
    const stuff = async (id: number): Promise<void> => {
      const res = await t4w.genTraits(id);
      bar.increment();
      chests.push(res);
    };
    let simps: string[] = [];
    let pending = [];
    for (let i = 0; i < numMints; i++) {
      pending.push(stuff(i));
    }
    try {
      const start = Date.now();
      await Promise.all(pending);
      const end = Date.now();
      console.log(end-start);


    } catch (e) {
      console.error(e);
    } finally {
      bar.stop()
      console.log(chests)
      addCollection(chests);
    }
  });
/*   it("test ", async () => {
    for (let i = 0; i < 10; i++) {
      await t4w.genTraits(i);
    }
  }) */

/*   it("uri", async () => {
    const start = Date.now();

    for (let i = 0; i < 25; i++) {
      const res = await t4w.genTraits(5);
      console.log(i)
    }
    const end = Date.now();
    console.log(end-start);

  }); */
});

function addCollection(data: any) {
  const files: string[] = fs
    .readdirSync("./test/chests")
    .filter((file) => file !== ".DS_Store");
  fs.writeFileSync(
    `./test/chests/chests_${files.length+1}.json`,
    JSON.stringify(data, null, 3)
  );
}
function calcChances<T>(weights: IMap<T, number>): IMap<T, number> {
  let total = weights
    .valueSeq()
    .toArray()
    .reduce((p, n) => p + n);
  return weights
    .map((wt) => Math.round((wt / total) * 100 * 100000) / 100000)
    .sort();
}
