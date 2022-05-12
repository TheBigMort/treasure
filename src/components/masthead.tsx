import { Stack, Typography } from '@mui/material';
import useMatchesMediaQuery from '@src/hooks/useMatchesMediaQuery';
import Image from 'next/image';
import React from 'react';
import { Parallax } from 'react-parallax';

const Masthead: React.FC = () => {
    const mdUp = useMatchesMediaQuery('up', 'md');

    return (
        <Parallax
            bgImage={mdUp ? '/assets/bg-image2.jpg' : '/assets/bg-image-narrow.jpg'}
            strength={300}
            blur={5}
        >
            <Stack
                justifyContent={'center'}
                pb="7rem"
                sx={{
                    height: '94vh',
                    width: '100vw',
                }}
            >
                <Stack textAlign="center" p="2.5rem">
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                        sx={{
                            bottom: 0,
                            width: '100%',
                        }}
                    >
                        <Image
                            src="/assets/logo.png"
                            height={230}
                            width={230}
                            layout="fixed"
                            alt="scroll down"
                        />
                    </Stack>

                    <Stack spacing={1}>
                        <Typography fontSize={mdUp ? '1.3rem' : '1.2rem'} fontFamily="SF Pro">
                            10,000 Randomly Generated Treasure Chests Containing Battle Gear on the
                            Ethereum Blockchain
                        </Typography>
                        <Typography fontSize={mdUp ? '1.3rem' : '1.2rem'} fontFamily="SF Pro">
                            1 Billion+ Possible Chest Combinations
                        </Typography>
                        <Typography fontSize={mdUp ? '1.3rem' : '1.2rem'} fontFamily="SF Pro">
                            1 Million+ Possible Traits
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    // my="3rem"
                    spacing={1}
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        mb: '3rem',
                    }}
                >
                    <Image
                        src="/assets/arrow-down2.png"
                        height={80}
                        width={105}
                        layout="fixed"
                        alt="scroll down"
                    />
                </Stack>
            </Stack>
        </Parallax>
    );
};
export default Masthead;
