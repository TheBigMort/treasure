import { Map as IMap } from "immutable";

function calcChances<T>(weights: IMap<T, number>): IMap<T, number> {
  let total = weights
    .valueSeq()
    .toArray()
    .reduce((p, n) => p + n);
  return weights
    .map((wt) => Math.round((wt / total) * 100 * 100000) / 100000)
    .sort();
}
describe("weight shifting", () => {
  it("improve chances", async () => {
    /*         const init_val = [1,4,9,25,69,150]
        const init_total = init_val.reduce((prev, next) => prev + next);
        const init_per = calcChances(init_val);
        console.log(init_val);
        console.log(init_per);
        for (let i = 8; i <= 18 ; i++) {

            const fin_val = init_val.map((elem) => elem + init_total/i);
            const fin_per = calcChances(fin_val);
            console.log(`Label: ${i}`)
            console.log(fin_per);
        }

 */

    const data = {
      Crossbow: 1430,
      Cannon: 383911,
      Chainsaw: 769406,
      Staff: 1160178,
      Arrows: 1550061,
      Katana: 1940063,
      Bow: 2334802,
      Scythe: 2730740,
      Ninjastars: 3114349,
      Mace: 3530600,
      "Battle-axe": 3925932,
      Knife: 4327015,
      Sword: 4737175,
      Boomerang: 5139547,
      Blowpipe: 5539107,
      Lance: 5947629,
      Warhammer: 6353270,
      Shank: 6759373,
      Dagger: 7162523,
      Darts: 7572865,
      Knuckledusters: 7973415,
      Spear: 8374325,
      Javelin: 8778979,
      Hammer: 9182264,
      Hatchet: 9589273,
      Blade: 10000000,
    };
    /*         const data = {
      "Chainbody": 1332,
      "Vest": 962970,
      "Robe": 2230826,
      "Ringmail": 3633704,
      "Chestplate": 5072067,
      "Armour": 6729583,
      "Chainmail": 8306679,
      "Platebody": 10000000
   }; */
    const numItemWts: IMap<number, number> = calcChances(
      IMap(
        [
          925210, 2410241, 5274519, 9472522, 13177989, 15000000, 13177989,
          9472522, 5274519, 2410241, 925210,
        ].map((val, index): [number, number] => [index + 8, val])
      )
    );
    let shifted: IMap<number, IMap<string, number>> = numItemWts.map(
      (val, key) =>
        calcChances(
          shift(key).map(
            (v) =>
              ((v / 100) *
                (10000 * (val / 100) * key) *
                Object.keys(data).length) /
              72
          )
        )
    );
    let overall: IMap<string, number> = calcChances(
      shifted.reduce((prev, val) => prev.merge(val))
    );
    console.log(shifted.toJS());
    console.log(overall.toJS());

    /*  const temp: IMap<string, number> = dataMap.map((elo, _, iter) => {
  const toAdd = ((<number>iter.reduce((prev,next) => prev+next) / 13 ** 2) * ((18 - numItems) ** 2))>>>6;
  return elo + toAdd;
}); */
    function shift(numItems: number) {
      const dataMap: IMap<string, number> = IMap(data).sort();
      /*   console.log("initial: ");
  console.log(calcChances(dataMap).toJS()); */
      const temp: IMap<string, number> = dataMap.map((elo, _, iter) => {
        const toAdd =
          (divide(<number>iter.reduce((prev, next) => prev + next), 13 ** 2) *
            (18 - numItems) ** 2) >>>
          14;
        return elo + toAdd;
      });
      /*     const temp: IMap<string, number> = dataMap.map((elo, _, iter) => {
    const toAdd = ((iter.min()! / 13 ** 2) * ((18 - numItems) ** 2))*5;
    return elo + toAdd;
  }); */
      /*   const newMap = calcChances(temp).map(
    (chance, item, iter) =>
      Math.round((chance - calcChances(dataMap).get(item)!) * 1000) / 1000
  ); */
      return calcChances(temp);
    }
  });
});
function divide(num: number, denom: number): number {
  return Math.floor(num / denom);
}
/* 
const modWts = [57.6923077, 5000, 30000, 50000, 14942.30769];
const numItemWts = [
  925210,
  2410241,
  5274519,
  9472522,
  13177989,
  15000000,
  13177989,
  9472522,
  5274519,
  2410241,
  925210
] 
const itemCatWts = [
        5027982,
        4471992,
        6694186,
        6139050,
        15000000,
        4471992,
        564935
    ]
*/
