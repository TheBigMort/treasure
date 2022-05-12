import prepped from './items';

const conConfig = {
    conArgs: [
        prepped.MAIN.HEAD,
        prepped.MAIN.TORSO,
        prepped.MAIN.FOOTWEAR,
        prepped.MAIN.BOTTOMS,
        prepped.MAIN.WEAPON,
        prepped.MAIN.SHIELD,
        prepped.MAIN.AMULET,
        prepped.MOD.POSSESSIVE,
        prepped.MOD.EXTRA,
        prepped.MOD.MATERIAL,
        prepped.MOD.TAIL,
    ],
    conParams: {
        price: '0.0420',
        MAX_SUPPLY: 10000,
        MAX_MULTIMINT: 25,
        MAX_RESERVE: 250,
    },
    contractAddress:
        process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
            ? ''
            : '0xFdd33230E1183DD58cC6349eD81670ddF5766434',
    chainIndex: process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? 1 : 4,
};
export { conConfig };
export default conConfig.conArgs;
