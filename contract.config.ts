const conArgs = {
    __uri: 'hello/',
    payees: [
        `0xEA4dC918525505d2A026Fd356cf2B723a0505Be8`,
        `0x4427fCC55d41f5eD6989Fc7c6AC1542653192b05`,
        `0x7db44F46Ee7385Ad0FD23Bd6323f8Bd80cF7fE92`,
        `0x4f65cDFfE6c48ad287f005AD14E78ff6433c8d67`,
    ],
    shares: [33, 33, 20, 14],
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
