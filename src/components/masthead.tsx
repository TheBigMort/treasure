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
        >
            <Stack
                justifyContent={'center'}
                sx={{
                    height: '94vh',
                    width: '100vw',
                }}
            >
                <Stack textAlign="center" p="2.5rem">
                    <Typography fontSize={mdUp ? '3.25rem' : '2.5rem'} fontFamily="SF Pro">
                        Treasure. (for Warriors)
                    </Typography>
                    <Stack spacing={1}>
                        <Typography fontSize={mdUp ? '1.3rem' : '1.2rem'} fontFamily="SF Pro">
                            10,000 Randomly Generated Treasure Chests Containing Battle gear on the
                            Ethereum blockchain
                        </Typography>
                        <Typography fontSize={mdUp ? '1.3rem' : '1.2rem'} fontFamily="SF Pro">
                            1B + Possible chest combinations
                        </Typography>
                        <Typography fontSize={mdUp ? '1.3rem' : '1.2rem'} fontFamily="SF Pro">
                            250,000+ Traits
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
