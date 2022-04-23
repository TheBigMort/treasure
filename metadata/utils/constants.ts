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
export { modClasses, rarityMods, categories };

const numItemWts = {
    '6': 1,
    '7': 2,
    '8': 9,
    '9': 28,
    '10': 66,
    '11': 121,
    '12': 175,
    '13': 198,
    '14': 174,
    '15': 122,
    '16': 65,
    '17': 28,
    '18': 10,
    '19': 2
  }