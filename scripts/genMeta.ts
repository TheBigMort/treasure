import * as fs from "fs";
import { conParams } from "../contract.config";
interface Metadata {
    name: string;
    image: string;
}

for (let i = 0; i < conParams.MAX_SUPPLY; i++) {
    fs.writeFile(`./metadata/${i}`, JSON.stringify(buildMeta(i), null, 3), (err) => {
        if (err) throw err;
    })
}
function buildMeta(id: number): Metadata {
    return <Metadata>{
        name: `Treasure Chest #${id}`,
        image: `https://gateway.pinata.cloud/ipfs/QmVDvXBsJd5xeVg6y9LFeJUrMrnnYGLxpuVdKvFqi9EP8B`
    }
}