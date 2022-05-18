import { ethers } from 'ethers';

/* eslint-disable import/prefer-default-export */
const treasure = {
    abi: [
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__head',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__torso',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__footwear',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__bottoms',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__weapon',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__shield',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__amulet',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__possessive',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__extra',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__material',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'string[]',
                            name: 'title',
                            type: 'string[]',
                        },
                        {
                            internalType: 'uint32[]',
                            name: 'weight',
                            type: 'uint32[]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'extra',
                            type: 'uint8[][]',
                        },
                        {
                            internalType: 'uint8[][]',
                            name: 'material',
                            type: 'uint8[][]',
                        },
                    ],
                    internalType: 'struct TreasureMetadata.Item',
                    name: '__tail',
                    type: 'tuple',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            inputs: [],
            name: 'ApprovalCallerNotOwnerNorApproved',
            type: 'error',
        },
        {
            inputs: [],
            name: 'ApprovalQueryForNonexistentToken',
            type: 'error',
        },
        {
            inputs: [],
            name: 'ApprovalToCurrentOwner',
            type: 'error',
        },
        {
            inputs: [],
            name: 'ApproveToCaller',
            type: 'error',
        },
        {
            inputs: [],
            name: 'BalanceQueryForZeroAddress',
            type: 'error',
        },
        {
            inputs: [],
            name: 'MintToZeroAddress',
            type: 'error',
        },
        {
            inputs: [],
            name: 'MintZeroQuantity',
            type: 'error',
        },
        {
            inputs: [],
            name: 'OwnerQueryForNonexistentToken',
            type: 'error',
        },
        {
            inputs: [],
            name: 'TransferCallerNotOwnerNorApproved',
            type: 'error',
        },
        {
            inputs: [],
            name: 'TransferFromIncorrectOwner',
            type: 'error',
        },
        {
            inputs: [],
            name: 'TransferToNonERC721ReceiverImplementer',
            type: 'error',
        },
        {
            inputs: [],
            name: 'TransferToZeroAddress',
            type: 'error',
        },
        {
            inputs: [],
            name: 'URIQueryForNonexistentToken',
            type: 'error',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'owner',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'approved',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'Approval',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'owner',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'operator',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'bool',
                    name: 'approved',
                    type: 'bool',
                },
            ],
            name: 'ApprovalForAll',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'previousOwner',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'OwnershipTransferred',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'shares',
                    type: 'uint256',
                },
            ],
            name: 'PayeeAdded',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'PaymentReceived',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'PaymentReleased',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'Transfer',
            type: 'event',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'approve',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'owner',
                    type: 'address',
                },
            ],
            name: 'balanceOf',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'contractURI',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'flipSaleState',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'getApproved',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'owner',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'operator',
                    type: 'address',
                },
            ],
            name: 'isApprovedForAll',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'lockCanvasSize',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'numMints',
                    type: 'uint256',
                },
            ],
            name: 'mintReserve',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'numMints',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address',
                },
            ],
            name: 'mintReserveToAddress',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'name',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'owner',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'ownerOf',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'payee',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'numMints',
                    type: 'uint256',
                },
            ],
            name: 'plunder',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'price',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address payable',
                    name: 'account',
                    type: 'address',
                },
            ],
            name: 'release',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
            ],
            name: 'released',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'renounceOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'reserved',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'safeTransferFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes',
                    name: '_data',
                    type: 'bytes',
                },
            ],
            name: 'safeTransferFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'operator',
                    type: 'address',
                },
                {
                    internalType: 'bool',
                    name: 'approved',
                    type: 'bool',
                },
            ],
            name: 'setApprovalForAll',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'newSize',
                    type: 'uint256',
                },
            ],
            name: 'setCanvasSize',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'string',
                    name: '__contractURI',
                    type: 'string',
                },
            ],
            name: 'setContractURI',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
            ],
            name: 'shares',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'status',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes4',
                    name: 'interfaceId',
                    type: 'bytes4',
                },
            ],
            name: 'supportsInterface',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'symbol',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'tokenURI',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalReleased',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalShares',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalSupply',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'transferFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'transferOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            stateMutability: 'payable',
            type: 'receive',
        },
    ],
    address: '0xEad23f848BfAf4B2086D4BcB4508FDE8990480b5',
};
const nodes = [
    'https://main-light.eth.linkpool.io',
    'https://eth-rpc.gateway.pokt.network',
    'https://api.mycryptoapi.com/eth',
    'https://ethereumnodelight.app.runonflux.io',
    'https://rpc.flashbots.net/',
    'https://rpc.ankr.com/eth',
    `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_KEY}/eth/mainnet`,
].map((url) => new ethers.providers.JsonRpcProvider(url, 1));
export { treasure, nodes };
