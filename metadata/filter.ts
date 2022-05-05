import * as fs from "fs";

const items: string[] = fs
  .readFileSync("./metadata/stuff.txt")
  .toString()
  .split("\n");
const final: string[] = items
  .sort()
  .filter((elem, index, arr) => arr.indexOf(elem) === index)
  .map((elem) => elem.trim());

fs.writeFileSync('./metadata/out/filtered.txt', final.join('\n'));
