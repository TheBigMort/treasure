import { Map as IMap } from "immutable";
import { addItems as _addItems } from "./addItems";
import { Chest, IChest, IChestItem, IScores, Scores } from "./types";
import { updateColors as _updateColors } from "./updateColors";

function addChests(newChests: string[][], scores: IScores = IMap()): IScores {
  scores = _addItems((<string[]>[]).concat(...newChests), scores);
  scores = _updateColors(scores);
  let size: number = scores.get("chestScores")?.size || 0;
  scores = scores.mergeIn(
    ["chestScores"],
    IMap(
      newChests.map((chest: string[], index): [number, IChest] => [
        size + 1 + index,
        buildChest(chest, size + 1 + index),
      ])
    )
  );
  let avgScores: number[] = [];
  let totScores: number[] = [];

  (<Scores["chestScores"]>scores.get("chestScores")).forEach((val: IChest) => {
    avgScores.push(<number>val.get("avgScore"));
    totScores.push(<number>val.get("score"));
  });
  avgScores.sort((a, b) => a - b);
  totScores.sort((a, b) => a - b);
  return scores.update("chestScores", <Scores["chestScores"]>IMap(), (prev) =>
    (<Scores["chestScores"]>prev).map((val: IChest, _, iter) => {
      val = val.set("avgRank", avgScores.indexOf(<number>val.get("avgScore"))+1);
      val = val.set("rank", totScores.indexOf(<number>val.get("score"))+1);
      return val;
    })
  );
  function buildChest(chest: string[], id: number): IChest {
    let totScore: number = 0;
    let items: IChestItem[] = chest.map((item: string): IChestItem => {
      let temp: IChestItem | undefined = <IChestItem | undefined>(
        scores.getIn(["itemScores", item])
      );
      if (!temp) throw Error(`Item not found: ${item}`);
      temp = <IChestItem>temp;
      totScore += ((): number => {
        if (!temp.get("score")) throw Error("not found");
        return <number>temp.get("score");
      })();
      return <IChestItem>temp;
    });

    return <IChest>IMap(<Chest>{
      tokenId: id,
      items: items,
      score: totScore,
      avgScore: totScore / items.length,
    });
  }
}
export { addChests };
