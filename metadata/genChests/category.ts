import { Map as IMap } from 'immutable';

export default class Category {
    category: string;

    modMappings: IMap<CatClass, IMap<string, IMap<'numUsed' | 'rarity', number>>> = IMap();

    // itemMappings: IMap<string, typeof (this.modMappings)> = IMap();

    constructor(cName: string) {
        this.category = cName;
    }
}
