import { Box, Typography } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { conParams } from 'contract.config';
import React, { FC } from 'react';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={Math.round(props.value) / (conParams.MAX_SUPPLY / 100)}
                />
            </Box>
            <Box sx={{ minWidth: 100 }}>
                <Typography
                    fontFamily="SF Pro"
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                >
                    {props.value === 0
                        ? 'connect to mainnet'
                        : `${Math.round(props.value)} / ${conParams.MAX_SUPPLY}`}
                </Typography>
            </Box>
        </Box>
    );
}

const Progress: FC<{ progress: number }> = ({ progress }) => (
    <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} />
    </Box>
);

export default Progress;
