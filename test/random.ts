import { Contract, ContractFactory } from "ethers";
import * as hre from "hardhat";
import { Map as IMap } from "immutable";

describe("randoms test", () => {
  let rand: Contract;
  const numRuns = 1;
  let totals: IMap<number, number> = IMap();
  let pending: Promise<any>[] = []
  beforeEach(async () => {
    try {
      const Randoms: ContractFactory = await hre.ethers.getContractFactory(
        "Randoms"
      );
      rand = await Randoms.deploy();
    } catch (e) {
      console.error(e);
    }
  });
  
  for (let i = 0; i < numRuns; i++) {
    it(`weighted ${i}`, async () => {
      //const stuff = ["17", "45", "5", "20", "13"];
      //const weights = [17, 45, 5, 20, 13];
      const stuff = ['50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50'];
      const weights = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
      pending.push(rand.weightedRandom(stuff, weights))
    });
  }
  it('final', async () => {
    (await Promise.all(pending)).forEach((elem) => {
      const num = parseInt(elem)
      totals = totals.set(num, totals.get(num, 0) + 1)
    })
    const final = {
      totals: totals.toJS(),
      percents: totals.map((total) => total / numRuns).toJS(),
    };
    console.log(final);
    
  
  })
  it('rand1', async () => {
    const res = await rand.rand1(1);
    console.log(res)
  })

});
