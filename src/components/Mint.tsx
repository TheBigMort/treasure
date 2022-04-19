import Progress from '@components/Progress';
import Title from '@components/Title';
import { JsonRpcSigner } from '@ethersproject/providers';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, IconButton, Stack, TextField, Typography } from '@mui/material';
import snackbarAtom from '@src/store/jotai';
import track from '@src/utils/track';
import { useContractCall, useEthers } from '@usedapp/core';
import { chainIndex, conParams, contractAddress } from 'contract.config';
import { ethers } from 'ethers';
import { useAtom } from 'jotai';
import { FC, useCallback, useState } from 'react';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import Treasure from '../../artifacts/contracts/Treasure.sol/Treasure.json';

const Mint: FC = () => {
    const [mintAmount, setMintAmount] = useState(0);
    const [, setSnackbar] = useAtom(snackbarAtom);
    const [isLoading, setIsLoading] = useState(false);

    const { active, library: provider, chainId } = useEthers();

    const [minted] =
        useContractCall({
            abi: new ethers.utils.Interface(Treasure.abi),
            address: contractAddress,
            method: 'totalSupply',
            args: [],
        }) ?? [];

    const mint = async () => {
        setIsLoading(true);
        const signer = provider?.getSigner();
        const contract = new ethers.Contract(
            contractAddress as string,
            Treasure.abi,
            signer as JsonRpcSigner
        );

        try {
            const transaction = await contract.plunder(mintAmount, {
                value: ethers.utils.parseEther(`${parseFloat(conParams.price) * mintAmount}`),
            });
            await transaction.wait();

            setSnackbar({
                severity: 'success',
                isOpen: true,
                message: 'Success! You are now a warrior!',
            });
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            const errMessage = err?.error?.message ?? err?.reason ?? err?.message ?? err;
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
    };

    const decreaseMintAmount = useCallback(() => {
        track('mint_amount:decreased');
        setMintAmount((amount) => (amount > 1 ? amount - 1 : amount));
    }, []);
    const increaseMintAmount = useCallback(() => {
        track('mint_amount:increased');
        setMintAmount((amount) => (amount < conParams.MAX_MULTIMINT ? amount + 1 : amount));
    }, []);
    return (
        <Stack id="mint" alignItems="center">
            <Title>Plunder Your Treasure</Title>
            <Typography fontFamily="SF Pro" sx={{ mb: '1rem' }}>
                0.0420 ETH per chest
            </Typography>
            <Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" mb="1.5rem">
                    <IconButton onClick={decreaseMintAmount} color="secondary" size="large">
                        <RiArrowLeftSFill fontSize="inherit" />
                    </IconButton>
                    <TextField
                        sx={{
                            maxWidth: '25%',
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
                        value={mintAmount}
                        onChange={(e) =>
                            setMintAmount(
                                Number(e.target.value) <= conParams.MAX_MULTIMINT
                                    ? Number(e.target.value)
                                    : conParams.MAX_MULTIMINT
                            )
                        }
                        color="secondary"
                        type="number"
                        placeholder="amount"
                        InputProps={{
                            inputProps: { min: 0, max: conParams.MAX_MULTIMINT },
                        }}
                    />
                    <IconButton onClick={increaseMintAmount} color="secondary" size="large">
                        <RiArrowRightSFill fontSize="inherit" />
                    </IconButton>
                </Stack>
                <Stack
                    sx={{
                        maxWidth: '300px',
                    }}
                >
                    {active && chainId !== chainIndex && (
                        <Alert severity="warning">Please connect to Ethereum Mainnet</Alert>
                    )}
                </Stack>

                <Typography fontFamily="Aleo" textAlign="center" sx={{ mb: '0.5rem' }}>
                    {mintAmount === 0 ? '0.00' : (0.042 * mintAmount).toFixed(4)}
                    <Typography component="span" fontFamily="Roboto">
                        &Xi;
                    </Typography>
                </Typography>

                <LoadingButton
                    loading={isLoading}
                    disabled={
                        mintAmount === 0 || chainId !== chainIndex || minted >= conParams.MAX_SUPPLY
                    }
                    // disabled={mintAmount === 0 || chainId !== 1 || minted === 520}
                    variant="contained"
                    disableElevation
                    color="secondary"
                    sx={{ mb: '1.5rem', alignSelf: 'center' }}
                    onClick={async () => {
                        track('mint_button:clicked', mintAmount.toString());
                        await mint();
                    }}
                    //
                >
                    {minted >= conParams.MAX_SUPPLY ? 'Sold out!' : 'Plunder (Mint)'}
                </LoadingButton>
            </Stack>
            <Progress progress={chainId === chainIndex ? minted : 0} />
        </Stack>
    );
};

export default Mint;
