/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Stack, TextField, Typography } from '@mui/material';
import Container from '@src/components/Container';
import Layout from '@src/components/Layout';
import Rarity from '@src/components/rarity';
import { IChest, IScores, Scores } from '@src/components/rarityScores/types';
import useMatchesMediaQuery from '@src/hooks/useMatchesMediaQuery';
import snackbarAtom from '@src/store/jotai';
import { getScores, recal } from '@src/utils/apiEndpoints';
import track from '@src/utils/track';
import { conConfig } from 'contract.config';
import { Map as IMap } from 'immutable';
import { useAtom } from 'jotai';
import Head from 'next/head';
import { useState } from 'react';

// contractURI - bafybeihvwstfo6frl4bjadfzsalvdotr5x4cstfwccoa4mo2p6kuetzvay
export default function RarityAnalyzer() {
    const mdUp = useMatchesMediaQuery('up', 'md');
    const [chestData, setChestData] = useState(IMap() as unknown as IChest);
    const [queried, setQueried] = useState(false);
    const [chestId, setChestId] = useState(1);
    const [numChests, setNumChests] = useState(0);
    const [, setSnackbar] = useAtom(snackbarAtom);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [isMetaLoading, setIsMetaLoading] = useState(false);

    return (
        <Layout seo={{ title: '' }}>
            <Head>
                <title>Treasure Rarity Analyzer</title>
            </Head>
            <Container>
                <Stack textAlign="center" alignItems={'center'} spacing={3} p="2rem">
                    <Typography
                        fontFamily={'Aleo'}
                        fontSize={mdUp ? '3.5rem' : '2.2rem'}
                        color="secondary"
                        fontStyle={'bold'}
                    >
                        Treasure Rarity Analyzer (Beta)
                    </Typography>
                    <Alert severity="warning">
                        DISCLAIMER: The rarity analyzer is in beta. Any rarities shown are subject
                        to change as more items are minted and as changes are made to the algorithm
                        that assigns each item's rarity.
                    </Alert>
                    <Stack direction={'row'} justifyContent="center" alignItems={'center'}>
                        <Typography
                            fontFamily={'Aleo'}
                            fontSize={mdUp ? '2rem' : '1.2rem'}
                            color="secondary"
                            fontStyle={'bold'}
                        >
                            Enter Chest ID:
                        </Typography>
                        <TextField
                            sx={{
                                width: '5rem',
                                mx: '1.5rem',
                                input: {
                                    textAlign: 'center',
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                            }}
                            value={chestId}
                            onChange={(e) => setChestId(Number(e.target.value))}
                            color="secondary"
                            type="number"
                            placeholder="tokenId"
                            InputProps={{
                                inputProps: { min: 0, max: conConfig.conParams.MAX_MULTIMINT },
                            }}
                        />
                    </Stack>
                    <LoadingButton
                        loading={isMetaLoading}
                        // disabled={mintAmount === 0 || chainId !== 1 || minted === 520}
                        variant="contained"
                        disableElevation
                        color="secondary"
                        sx={{ mb: '1.5rem', alignSelf: 'center' }}
                        onClick={async () => {
                            track('mint_button:clicked', chestId.toString());
                            try {
                                setIsMetaLoading(true);
                                await recal();
                                setSnackbar({
                                    isOpen: true,
                                    message: 'Metadata Refresh Queued. Please Allow up to 1 Minute',
                                    severity: 'success',
                                });
                                setIsMetaLoading(false);
                            } catch (err: any) {
                                setIsMetaLoading(false);
                                const errMessage =
                                    err?.error?.message ?? err?.reason ?? err?.message ?? err;
                                // eslint-disable-next-line no-console
                                console.warn('ERROR: ', {
                                    message: errMessage,
                                });
                                // console.warn("ERROR: ", {
                                //   message: err?.error.data.originalError.message ?? "",
                                // });
                                setSnackbar({
                                    isOpen: true,
                                    message: errMessage,
                                    severity: 'error',
                                });
                            }
                        }}
                        //
                    >
                        {'Refresh Metadata'}
                    </LoadingButton>
                    <LoadingButton
                        loading={isSearchLoading}
                        // disabled={mintAmount === 0 || chainId !== 1 || minted === 520}
                        variant="contained"
                        disableElevation
                        color="secondary"
                        sx={{ mb: '1.5rem', alignSelf: 'center' }}
                        onClick={async () => {
                            track('mint_button:clicked', chestId.toString());
                            try {
                                setIsSearchLoading(true);
                                const scores: IScores = await getScores();
                                const cs = scores.get('chestScores');
                                if (!cs) throw Error(`INTERNAL SERVER ERROR CODE: 506`);

                                const cd = (cs as Scores['chestScores']).find(
                                    (val) => val.get('tokenId') === chestId
                                );

                                if (chestId < 1 || chestId > cs.size)
                                    throw Error(`Please Enter a tokenId from 1 to ${cs.size}`);
                                if (!cd || !cd.get('items'))
                                    throw Error(`INTERNAL SERVER ERROR CODE: 507`);
                                setChestData(cd as unknown as IChest);
                                setSnackbar({
                                    severity: 'success',
                                    isOpen: true,
                                    message: 'Query Successful',
                                });
                                setQueried(true);
                                setNumChests(cs.size);
                                setIsSearchLoading(false);
                            } catch (err: any) {
                                setIsSearchLoading(false);
                                const errMessage =
                                    err?.error?.message ?? err?.reason ?? err?.message ?? err;
                                // eslint-disable-next-line no-console
                                console.warn('ERROR: ', {
                                    message: errMessage,
                                });
                                // console.warn("ERROR: ", {
                                //   message: err?.error.data.originalError.message ?? "",
                                // });
                                setSnackbar({
                                    isOpen: true,
                                    message: errMessage,
                                    severity: 'error',
                                });
                            }
                        }}
                        //
                    >
                        {'Search'}
                    </LoadingButton>
                    {queried ? (
                        <Stack>
                            <Typography
                                fontFamily={'Aleo'}
                                fontSize={mdUp ? '3rem' : '2rem'}
                                color="secondary"
                                fontStyle={'bold'}
                            >{`Chest #${chestData.get('tokenId')}`}</Typography>
                            <Rarity data={chestData} numChests={numChests} />
                        </Stack>
                    ) : (
                        <></>
                    )}
                </Stack>
            </Container>
        </Layout>
    );
}
