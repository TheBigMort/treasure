import { Typography } from '@mui/material';
import { FC } from 'react';

const Title: FC = ({ children }) => (
    <Typography
        variant="h3"
        textAlign="center"
        // fontFamily={["Franklin Gothic", "Roboto"].join()}
        fontFamily="Aleo Light"
        sx={{
            fontWeight: '900',
            mb: '1.5rem',
            mt: '1.5rem',
        }}
        color="secondary"
    >
        {children}
    </Typography>
);

export default Title;
