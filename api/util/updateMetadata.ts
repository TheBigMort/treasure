import { Promise as BPromise } from 'bluebird';
import { ethers } from 'ethers';
import { nodes, treasure } from './constants';
import { scores } from './rarityScores';

export default async function updateMetadata() {
    const parseChest = async (id: number): Promise<string[]> => {
        const uri: string = (
            (await BPromise.any(
                nodes.map((node) =>
                    new ethers.Contract(treasure.address as string, treasure.abi, node).tokenURI(id)
                )
            )) as string
        ).slice(29);
        const metadata = JSON.parse(Buffer.from(uri, 'base64').toString('utf-8'));
        const attributes: string[] = (
            metadata.attributes as { value: string; trait_type: string }[]
        ).map((attr) => attr.value);
        return attributes;
    };
    const total: number = (
        await BPromise.any(
            nodes.map((node) =>
                new ethers.Contract(treasure.address as string, treasure.abi, node).totalSupply()
            )
        )
    ).toNumber();
    const pending = [];
    for (let i = (scores.getScores().get('chestScores')?.size ?? 0) + 1; i <= total; i += 1) {
        pending.push(parseChest(i));
    }
    const final = await BPromise.all(pending);
    scores.addChests(final);
}
