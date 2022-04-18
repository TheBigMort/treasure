const conArgs = {
    __uri: 'hello/',
    payees: [
        `0xf89eF996c90D1fD93b93F0fC79c3afd9B2e531F9`,
        `0x599ED2119EFC6b97d23729E0f2aF5Bf71c1e1249`,
        `0xE664A24b276C7957Af9bf9ebC96A880fFe149d2A`,
    ],
    shares: [34, 33, 33],
    _name: 'Treasure (for Warriors)',
    _symbol: 'T4W',
};

const conParams = {
    price: '0.0420',
    MAX_SUPPLY: 10000,
    MAX_MULTIMINT: 25,
    MAX_RESERVE: 100,
};
const contractAddress =
    process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
        ? ''
        : '0xC45423d5002666f8744e17909abDfEB1f6Be54CC';
const chainIndex = process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? 1 : 4;

export { conArgs, conParams, contractAddress, chainIndex };
