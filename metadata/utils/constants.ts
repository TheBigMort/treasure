/* eslint-disable import/prefer-default-export */
const categories = ['head', 'torso', 'footwear', 'bottoms', 'weapon', 'shield'] as const;
const modClasses = ['material', 'tail', 'possessive', 'extra', 'main'] as const;
const rarityMods = {
    seeds: {
        base: 1,
        numeratorMult: 2,
    },
    categories: {
        catChanceRedMult: 1,
    },
};
const wtMaxValue: number = 2**32-1;
export { modClasses, rarityMods, categories, wtMaxValue };
