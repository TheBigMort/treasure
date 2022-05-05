import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import * as dotenv from "dotenv";
import { BigNumber, Contract, ContractFactory } from "ethers";
import { parseEther } from "ethers/lib/utils";
import * as hre from "hardhat";
import { conConfig } from "../contract.config";

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
  describe("Mint Reverts", () => {
    let cs: SignerWithAddress;
    let ac: Contract;
    beforeEach(async () => {
      try {
        cs = signers[getRandInt(signers.length)];
        ac = t4w.connect(cs);
        await t4w.flipSaleState();
      } catch (e) {
        console.error(e);
      }
    });
    it("Error: Sale is paused", async () => {
      await t4w.flipSaleState();
      ac = t4w.connect(cs);
      expect((await ac.balanceOf(cs.address)).toNumber()).to.equal(0);
      try {
        await buildMint(ac, 5);
        // eslint-disable-next-line no-empty
      } catch {
      } finally {
        expect((await ac.balanceOf(cs.address)).toNumber()).to.equal(0);
      }
    });
    it("Error: Not enough ether", async () => {
      expect((await ac.balanceOf(cs.address)).toNumber()).to.equal(0);
      const num: number = 1 + getRandInt(conConfig.conParams.MAX_MULTIMINT);

      try {
        await ac.plunder(num, {
          value: parseEther(
            (parseInt(conConfig.conParams.price) - 0.000001).toString()
          ).mul(num),
        });
        // eslint-disable-next-line no-empty
      } catch {
      } finally {
        expect((await ac.balanceOf(cs.address)).toNumber()).to.equal(0);
      }
    });
    it("Error: Exceeds MAX_MULTIMINT", async () => {
      expect((await ac.balanceOf(cs.address)).toNumber()).to.equal(0);
      try {
        await buildMint(ac, conConfig.conParams.MAX_MULTIMINT + 1);
        // eslint-disable-next-line no-empty
      } catch {
      } finally {
        expect((await ac.balanceOf(cs.address)).toNumber()).to.equal(0);
      }
    });
  });
  describe("Functions", () => {
    beforeEach(async () => {
      await t4w.flipSaleState();
      await buildMint(t4w, conConfig.conParams.MAX_MULTIMINT);
    });
    it("mintReserveToAddress", async () => {
      expect((await t4w.balanceOf(signers[5].address)).toNumber()).to.equal(0);
      expect((await t4w.reserved()).toNumber()).to.equal(0);
      await t4w.mintReserveToAddress(5, signers[5].address);
      expect((await t4w.balanceOf(signers[5].address)).toNumber()).to.equal(5);
      expect((await t4w.reserved()).toNumber()).to.equal(5);
    });
    it("mintReserve", async () => {
      expect((await t4w.balanceOf(signers[0].address)).toNumber()).to.equal(
        conConfig.conParams.MAX_MULTIMINT
      );
      expect((await t4w.reserved()).toNumber()).to.equal(0);
      await t4w.mintReserve(5);
      expect((await t4w.balanceOf(signers[0].address)).toNumber()).to.equal(
        conConfig.conParams.MAX_MULTIMINT + 5
      );
      expect((await t4w.reserved()).toNumber()).to.equal(5);
    });
    /*         it('setBaseURI', async () => {
            const newURI: string = 'testing/';
            // eslint-disable-next-line no-underscore-dangle
            expect(await t4w.tokenURI(1)).to.equal(`${conConfig.conArgs.__uri}1`);
            expect(await t4w.baseURI()).to.equal(conConfig.conArgs.__uri);
            await t4w.setBaseURI(newURI);
            // eslint-disable-next-line no-underscore-dangle
            expect(await t4w.tokenURI(1)).to.equal(`${newURI}1`);
            expect(await t4w.baseURI()).to.equal(newURI);
        }); */
    /*         it('withdraw', async () => {
            const releases: Promise<any>[] = [];
            const LBRInitBal: number = parseFloat(
                formatEther(await hre.ethers.provider.getBalance(t4w.address))
            );
            const acctInitBal: number[] = (
                await Promise.all(
                    (<Array<string>>conConfig.conArgs.payees).map((address) => {
                        releases.push(t4w.release(address));
                        return hre.ethers.provider.getBalance(address);
                    })
                )
            ).map((elem: BigNumber) => parseFloat(formatEther(elem)));
            await Promise.all(releases);
            const acctBal: number[] = (
                await Promise.all(
                    (<Array<string>>conConfig.conArgs.payees).map((address) =>
                        hre.ethers.provider.getBalance(address)
                    )
                )
            ).map((elem: BigNumber) => parseFloat(formatEther(elem)));
            expect((await hre.ethers.provider.getBalance(t4w.address)).toNumber()).to.equal(0);
            acctBal.forEach((bal, index) => {
                const bi: number = bal;
                const bf: number = acctInitBal[index] + LBRInitBal * (conArgs.shares[index] / 100);
                const rounded: number = Math.round(bf - bi);
                expect(rounded).to.equal(0);
            });
        }); */
    it("ownerOf", async () => {
      expect(
        await t4w.ownerOf(getRandInt(conConfig.conParams.MAX_MULTIMINT))
      ).to.equal(signers[0].address);
    });
/*     it("name", async () => {
      expect(await t4w.name()).to.equal(conArgs._name);
    });
    it("symbol", async () => {
      expect(await t4w.symbol()).to.equal(conArgs._symbol);
    }); */
    it("tokenOfOwnerByIndex", async () => {
      const randIndex: number = getRandInt(conConfig.conParams.MAX_MULTIMINT);

      expect(
        (
          await t4w.tokenOfOwnerByIndex(signers[0].address, randIndex)
        ).toNumber()
      ).to.equal(randIndex);
    });
    it("tokenByIndex", async () => {
      const randIndex: number = getRandInt(conConfig.conParams.MAX_MULTIMINT);
      expect((await t4w.tokenByIndex(randIndex)).toNumber()).to.equal(
        randIndex
      );
    });
    it("tokensOfOwner", async () => {
      (await t4w.tokensOfOwner(signers[0].address)).forEach(
        (elem: BigNumber, index: number) =>
          expect(elem.toNumber()).to.equal(index)
      );
    });
  });
});
