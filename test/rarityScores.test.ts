import * as fs from "fs";
import { IChestItem2, Scores } from "metadata/types";
import rarityScores from "../metadata/rarityScores";
describe("assign rarity", () => {
  it("test 1", () => {
    const items: string[] = [].concat(
      ...(<any[]>(
        JSON.parse(fs.readFileSync("./test/chests/chests_18.json").toString())
      ))
    );
    const rs = rarityScores();
    rs.addItems(items);
    const itemScores = <Scores["itemScores"]>rs.getScores().get("itemScores");
    const formatted = itemScores
      .groupBy((val: IChestItem2) => val.get("mainCat"))
      .map((mapping) => mapping.sortBy((v) => v.get("score")).reverse());
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
    console.log(
      (<any>rs.getScores().getIn(["mainModTotals", "Hammer"])!).toJS()
    );
    fs.writeFileSync(
      "./test/reports/scores.json",
      JSON.stringify(formatted.toJS(), null, 3)
    );
    fs.writeFileSync(
      "./test/reports/allScores.json",
      JSON.stringify(rs.getScores().toJS(), null, 3)
    );
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
