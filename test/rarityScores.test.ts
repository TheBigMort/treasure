import * as fs from "fs";
import { List } from "immutable";
import { Scores } from "metadata/rarityScores/types";
import rarityScores from "../metadata/rarityScores";
describe("assign rarity", () => {
  it("test 1", () => {
    const chests: string[][] = <string[][]>(
      JSON.parse(fs.readFileSync("./test/chests/chests_mod_16.json").toString())
    );
    const rs = rarityScores();
    rs.addChests(chests);
    const res: List<any> = List(
      (<Scores["chestScores"]>rs.getScores().get("chestScores")).valueSeq()
    );
    const final = res
      .sortBy((val) => val.get("avgScore"))
      .reverse()
      .toJS();


    let topItems = (<number[]>(
      final.slice(0, 100).map((val) => (<any>val).items.length)
    )).sort((a, b) => a - b);
    console.log(topItems[0]);
    console.log(topItems[topItems.length-1]);
    console.log(topItems.reduce((p,n) => p+n)/topItems.length);


    fs.writeFileSync(
      "./test/reports/chestScores.json",
      JSON.stringify(final, null, 3)
    );
    /*     const itemScores = <Scores["itemScores"]>rs.getScores().get("itemScores");
    const formatted = itemScores
      .groupBy((val: IChestItem) => val.get("mainCat"))
      .map((mapping) => mapping.sortBy((v) => v.get("score")).reverse()); */
    /*     itemScores.forEach((val) => {
      if (
        (<IMap<any, any>>val.get("brokenDown"))
          .valueSeq()
          .toArray()
          .every((v) => v === "None")
      ) {
        console.log(val.get("item"));
      }
    }); */
    /*     console.log(
      (<any>rs.getScores().getIn(["mainModTotals", "Hammer"])!).toJS()
    );
    fs.writeFileSync(
      "./test/reports/scores.json",
      JSON.stringify(formatted.toJS(), null, 3)
    );
    fs.writeFileSync(
      "./test/reports/allScores.json",
      JSON.stringify(rs.getScores().toJS(), null, 3)
    ); */
    /*     let chestScores: IMap<number, List<number>> = IMap();
    let tokenIdScores: IMap<string, number> = IMap();
    const allChestItems: string[][] = <string[][]>(
      JSON.parse(
        fs.readFileSync("./metadata/in/chests/chests_1.json").toString()
      )
    );
    allChestItems.forEach((chest, index) => {
      const totalScore: number = chest
        .map((val): number => <number>scores.get(val))
        .reduce((p, n) => p + n);
      chestScores = chestScores.update(
        chest.length,
        <List<number>>List([]),
        (last) => <List<number>>last.push(totalScore/chest.length)
      );
      tokenIdScores = tokenIdScores.set(index.toString(), totalScore);
    });
    const avgScores: IMap<number, number> = chestScores.map(
      (val, _, arr) => <number>val.reduce((p, n) => p + n) / val.count()
    );
    console.log(avgScores.toJS()) */
  });
});
