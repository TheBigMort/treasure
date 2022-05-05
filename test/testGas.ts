import {
  TransactionReceipt,
  TransactionResponse
} from "@ethersproject/abstract-provider";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
import { parseEther } from "ethers/lib/utils";
import fs from "fs";
import * as hre from "hardhat";
import { conConfig } from "../contract.config";

const reportDir: string = "./test/reports";
const ETH2USD: number = 3040;
const ETH2GBP: number = 2327;
const price: number = 0.08;

const getRandInt = (max: number) => Math.floor(Math.random() * max);
// const getRandURL = () => `${urls[getRandInt(urls.length)]}/token/`;
const buildMint = (
  con: Contract,
  signer: SignerWithAddress,
  numMints: number
) => {
  const overrides = {
    value: parseEther(price.toString()).mul(numMints),
  };
  return con.connect(signer).plunder(numMints, overrides);
};
const getGas = async (
  tx:
    | TransactionResponse
    | Promise<TransactionResponse>
    | TransactionResponse[]
    | Promise<TransactionResponse>[]
): Promise<number | number[]> => {
  if (Array.isArray(tx)) {
    return (
      await Promise.all(
        (
          await Promise.all(tx)
        ).map((t: TransactionResponse) =>
          hre.ethers.provider.getTransactionReceipt(t.hash)
        )
      )
    ).map(
      (txRec: TransactionReceipt) =>
        Math.round(txRec.gasUsed.toNumber() * 100) / 100
    );
  }
  const t: TransactionResponse = await tx;
  return (
    Math.round(
      (
        await hre.ethers.provider.getTransactionReceipt(t.hash)
      ).gasUsed.toNumber() * 100
    ) / 100
  );
};
const average = (array: number[]) =>
  array.reduce((a, b) => a + b) / array.length;
const gasToUsd = (gas: number, gwei: number, eth2usd: number): number =>
  Math.round(gas * 10 ** -9 * gwei * eth2usd * 100) / 100;
const gasMap: Map<string, number> = new Map();

describe("Gas Tests", () => {
  let lbr: Contract;
  let signers: Array<SignerWithAddress>;
  const getRandSigner: Function = (): SignerWithAddress =>
    signers[getRandInt(signers.length)];
  beforeEach(async () => {
    try {
      signers = await hre.ethers.getSigners();
      const Treasure: ContractFactory = await hre.ethers.getContractFactory(
        "Treasure",
        signers[0]
      );
      lbr = await Treasure.deploy(...conConfig.conArgs);
      gasMap.set("deploy", <number>await getGas(lbr.deployTransaction));
      await lbr.flipSaleState();
    } catch (e) {
      console.error(e);
    }
  });
  describe("Mints", () => {
    beforeEach(async () => {
      const firstMints: Promise<any>[] = [];
      for (let i = 0; i < signers.length; i += 1) {
        firstMints.push(buildMint(lbr, signers[i], 1));
      }
      await Promise.all(firstMints);
    });
    for (let i = 1; i <= conConfig.conParams.MAX_MULTIMINT; i += 5) {
      const title: string = `mint(${i})`;
      it(title, async () => {
        const avgs: number[] = [];
        for (let k = 0; k < 5; k += 1) {
          const mints: Promise<TransactionResponse>[] = [];
          for (let j = 0; j < signers.length; j += 1) {
            mints.push(buildMint(lbr, signers[j], i));
          }
          const avg: number = average(<number[]>await getGas(mints));
          avgs.push(avg);
        }
        gasMap.set(title, average(avgs));
      });
    }
    for (let i = 10; i <= conConfig.conParams.MAX_RESERVE; i += 10) {
      const title: string = `mintReserveToAddress(${i})`;
      it(title, async () => {
        const txs: Promise<TransactionResponse>[] = [];
        for (
          let k = 0;
          k < Math.floor(conConfig.conParams.MAX_RESERVE / i);
          k += 1
        ) {
          txs.push(
            lbr
              .connect(signers[0])
              .mintReserveToAddress(i, signers[5].address)
          );
        }
        gasMap.set(title, average(<number[]>await getGas(txs)));
      });
    }
    for (let i = 1; i <= 10; i += 1) {
      const numMints = i * 10;
      const title: string = `mintReserve(${numMints})`;
      it(title, async () => {
        const txs: Promise<TransactionResponse>[] = [];
        for (
          let k = 0;
          k < Math.floor(conConfig.conParams.MAX_RESERVE / numMints);
          k += 1
        ) {
          txs.push(lbr.connect(signers[0]).mintReserve(numMints));
        }
        gasMap.set(title, average(<number[]>await getGas(txs)));
      });
    }
  });
  describe("Contract Management", () => {
    beforeEach(async () => {
      const mints: Promise<TransactionResponse>[] = [];
      for (let i = 0; i < 10; i += 1) {
        const s: SignerWithAddress = getRandSigner();
        const num: number = 1 + getRandInt(25);
        mints.push(buildMint(lbr, s, num));
      }
      await Promise.all(mints);
    });
/*     it("setBaseURI", async () => {
      const txs: Promise<TransactionResponse>[] = [];
      for (let i = 0; i < 10; i += 1) {
        txs.push(lbr.connect(signers[0]).setBaseURI(getRandURL()));
      }
      gasMap.set("setBaseURI", average(<number[]>await getGas(txs)));
    }); */
    it("flipSaleState", async () => {
      const txs: Promise<TransactionResponse>[] = [];
      for (let i = 0; i < 10; i += 1) {
        txs.push(lbr.connect(signers[0]).flipSaleState());
      }
      gasMap.set("flipSaleState", average(<number[]>await getGas(txs)));
    });
  });
  describe("withdrawals", async () => {
    beforeEach(async () => {
      const mints: Promise<TransactionResponse>[] = [];
      for (let i = 0; i < 10; i += 1) {
        const s: SignerWithAddress = getRandSigner();
        const num: number = 1 + getRandInt(25);
        mints.push(buildMint(lbr, s, num));
      }
      await Promise.all(mints);
    });
    it("release", async () => {
      const txs: Promise<TransactionResponse>[] = [
        signers[4],
        signers[5],
        signers[6],
        signers[7]
      ].map((s: SignerWithAddress) => lbr.connect(s).release(s.address));
      gasMap.set("release", average(<number[]>await getGas(txs)));
    });
  });
});
after(() => {
  let csvStr: string = "";
  const combineElems = (key?: string, val?: number): string => {
    let str: string = "";
    if (!key && !val) {
      str = `title,gas`;
      for (let i = 1; i <= 4; i += 1) {
        str = `${str},$${ETH2USD}/ETH @ ${25 * i}gwei`;
      }
      for (let i = 1; i <= 4; i += 1) {
        str = `${str},$${ETH2GBP}/ETH @ ${25 * i}gwei`;
      }
    } else {
      if (!key || !val) throw new Error("No key or val");
      str = `${key},${val}`;
      for (let i = 1; i <= 4; i += 1) {
        str = `${str},${gasToUsd(<number>val, 25 * i, ETH2USD)}`;
      }
      for (let i = 1; i <= 4; i += 1) {
        str = `${str},${gasToUsd(<number>val, 25 * i, ETH2GBP)}`;
      }
    }
    return str;
  };
  const setCSVStr = (key?: string, val?: number) => {
    if (key && val) {
      if (csvStr.length === 0) throw new Error("Headers not set!");
      csvStr = `${csvStr}\n${combineElems(key, val)}`;
    } else {
      csvStr = combineElems();
    }
  };

  setCSVStr();
  Array.from(gasMap.entries()).forEach((val: [string, number]) =>
    setCSVStr(val[0], val[1])
  );
  const fileNum: number = fs
    .readdirSync(reportDir)
    .filter((val) => val.endsWith(".csv")).length;
  const csvName: string =
    fileNum === 0
      ? `${reportDir}gasUsed.csv`
      : `${reportDir}gasUsed(${fileNum}).csv`;
  fs.writeFileSync(csvName, csvStr);
});
