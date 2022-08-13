import { Stack, Typography } from '@mui/material';
import { IChest, IChestItem } from '@src/components/rarityScores/types';
import useMatchesMediaQuery from '@src/hooks/useMatchesMediaQuery';
import theme from '@src/styles/theme';
import { FC } from 'react';

export type RarityQuery = {
    tokenId: number;
};
export type RarityItemInfo = {
    item: string;
    color: string;
    category: string;
    score: number;
    rank: string;
};
const RarityItem: FC<RarityItemInfo> = ({ item, color, category, score, rank }) => {
    const mdUp = useMatchesMediaQuery('up', 'md');
    return (
        <Stack direction="row" spacing={2}>
            <Stack width={'40%'}>
                <Typography color={color} fontSize={mdUp ? '0.9rem' : '0.7rem'} fontFamily={'Aleo'}>
                    {item}
                </Typography>
            </Stack>
            <Stack width={'20%'}>
                <Typography color={color} fontSize={mdUp ? '0.9rem' : '0.7rem'} fontFamily={'Aleo'}>
                    {category}
                </Typography>
            </Stack>
            <Stack width={'20%'}>
                <Typography color={color} fontSize={mdUp ? '0.9rem' : '0.7rem'} fontFamily={'Aleo'}>
                    {rank}
                </Typography>
            </Stack>
            <Stack width={'20%'}>
                <Typography color={color} fontSize={mdUp ? '0.9rem' : '0.7rem'} fontFamily={'Aleo'}>
                    {Math.round(score * 100) / 100}
                </Typography>
            </Stack>
        </Stack>
    );
};

const Rarity: FC<{ data: IChest; numChests: number }> = ({ data, numChests }) => {
    const mdUp = useMatchesMediaQuery('up', 'md');
    return (
        <Stack
            padding={'1rem'}
            mb="6rem"
            height="fill"
            width="80vw"
            maxWidth={'800px'}
            sx={{
                background: '#291f11',
            }}
        >
            <Stack direction={'column'} width="100%" spacing={1}>
                <Stack direction="row">
                    <Stack width={'40%'}>
                        <Typography
                            color={theme.palette.secondary.main}
                            fontSize={mdUp ? '1.7rem' : '1rem'}
                            fontFamily={'Aleo'}
                        >
                            Item
                        </Typography>
                    </Stack>
                    <Stack width={'20%'}>
                        <Typography
                            color={theme.palette.secondary.main}
                            fontSize={mdUp ? '1.7rem' : '1rem'}
                            fontFamily={'Aleo'}
                        >
                            Category
                        </Typography>
                    </Stack>
                    <Stack width={'20%'}>
                        <Typography
                            color={theme.palette.secondary.main}
                            fontSize={mdUp ? '1.7rem' : '1rem'}
                            fontFamily={'Aleo'}
                        >
                            Rank
                        </Typography>
                    </Stack>
                    <Stack width={'20%'}>
                        <Typography
                            color={theme.palette.secondary.main}
                            fontSize={mdUp ? '1.7rem' : '1rem'}
                            fontFamily={'Aleo'}
                        >
                            Score
                        </Typography>
                    </Stack>
                </Stack>
                {(data.get('items') as IChestItem[]).map((val: IChestItem) => (
                    <RarityItem
                        key={val.get('item') as string}
                        item={val.get('item') as string}
                        color={val.get('color') as string}
                        category={val.get('mainCat') as string}
                        score={val.get('score') as number}
                        rank={val.get('rank') as string}
                    />
                ))}
            </Stack>
            <Stack direction="row" mt={'2rem'} spacing={1}>
                <Stack width={'28%'}></Stack>
                <Stack width={'18%'}>
                    <Typography
                        color={theme.palette.secondary.main}
                        fontSize={mdUp ? '1.4rem' : '1rem'}
                        fontFamily={'Aleo'}
                    >
                        Avg. Rank
                    </Typography>
                </Stack>
                <Stack width={'18%'}>
                    <Typography
                        color={theme.palette.secondary.main}
                        fontSize={mdUp ? '1.4rem' : '1rem'}
                        fontFamily={'Aleo'}
                    >
                        Avg. Score
                    </Typography>
                </Stack>
                <Stack width={'18%'}>
                    <Typography
                        color={theme.palette.secondary.main}
                        fontSize={mdUp ? '1.4rem' : '1rem'}
                        fontFamily={'Aleo'}
                    >
                        Tot. Rank
                    </Typography>
                </Stack>
                <Stack width={'18%'}>
                    <Typography
                        color={theme.palette.secondary.main}
                        fontSize={mdUp ? '1.4rem' : '1rem'}
                        fontFamily={'Aleo'}
                    >
                        Tot. Score
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction={'row'} mt="0.8rem">
                <Stack width={'28%'}>
                    <Typography
                        color={data.get('color') as string}
                        fontSize={mdUp ? '1.1rem' : '0.8rem'}
                        fontFamily={'Aleo'}
                    >
                        Treasure. (For Warriors.)
                    </Typography>
                </Stack>
                <Stack width={'18%'}>
                    <Typography
                        color={data.get('color') as string}
                        fontSize={mdUp ? '1.1rem' : '0.8rem'}
                        fontFamily={'Aleo'}
                    >
                        {`${data.get('avgRank') as string}/${numChests}`}
                    </Typography>
                </Stack>
                <Stack width={'18%'}>
                    <Typography
                        color={data.get('color') as string}
                        fontSize={mdUp ? '1.1rem' : '0.8rem'}
                        fontFamily={'Aleo'}
                    >
                        {Math.round((data.get('avgScore') as number) * 100) / 100}
                    </Typography>
                </Stack>
                <Stack width={'18%'}>
                    <Typography
                        color={data.get('color') as string}
                        fontSize={mdUp ? '1.1rem' : '0.8rem'}
                        fontFamily={'Aleo'}
                    >
                        {`${data.get('rank') as string}/${numChests}`}
                    </Typography>
                </Stack>
                <Stack width={'18%'}>
                    <Typography
                        color={data.get('color') as string}
                        fontSize={mdUp ? '1.1rem' : '0.8rem'}
                        fontFamily={'Aleo'}
                    >
                        {Math.round((data.get('score') as number) * 100) / 100}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
export default Rarity;
