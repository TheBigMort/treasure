/* eslint-disable react/jsx-key */
import { Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import Mint from './Mint';
import Title from './Title';

type TimePeriod = 'Days' | 'Hours' | 'Minutes' | 'Seconds';

type TimerSegmentType = {
    timePeriod: TimePeriod;
    value: number;
};
const TimerSegment: FC<TimerSegmentType> = ({ timePeriod, value }) => {
    const formattedValue: string = value.toString().padStart(2, '0');
    return (
        <Stack direction="column" alignContent="center" textAlign={'center'}>
            <Typography fontFamily="Aleo" fontSize="2rem">
                {formattedValue}
            </Typography>
            <Typography fontFamily="Aleo" fontSize="2rem">
                {timePeriod}
            </Typography>
        </Stack>
    );
};
const Timer: FC = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMins] = useState(0);
    const [seconds, setSecs] = useState(0);
    const [difference, setDifference] = useState(1);

    useEffect(() => {
        const target = new Date(process.env.NEXT_PUBLIC_MINTDATE!);

        const interval = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();
            setDifference(diff);

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            setDays(d);

            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            setHours(h);

            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setMins(m);

            const s = Math.floor((diff % (1000 * 60)) / 1000);
            setSecs(s);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return difference <= 0 ? (
        <Stack direction="row" alignItems="center" justifyContent="center" pt="1.5rem" pb="3rem">
            <Mint />
        </Stack>
    ) : (
        <Stack direction="column" alignItems="center">
            <Title>Countdown To Mint</Title>
            <Stack direction="row" spacing={3}>
                {[
                    { timePeriod: 'Days', value: days },
                    { timePeriod: 'Hours', value: hours },
                    { timePeriod: 'Minutes', value: minutes },
                    { timePeriod: 'Seconds', value: seconds },
                ].map((val: any) => (
                    <TimerSegment timePeriod={val.timePeriod} value={val.value} />
                ))}
            </Stack>
        </Stack>
    );
};
export default Timer;
