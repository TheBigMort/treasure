import MUIContainer from '@mui/material/Container';
import { FC } from 'react';

const Container: FC = ({ children }) => (
    <MUIContainer
        component="main"
        maxWidth="lg"
        sx={{
            position: 'relative',
            overflowX: 'hidden',
            // overflowY: "scroll",
            pb: '3.5rem',
        }}
    >
        {children}
    </MUIContainer>
);

export default Container;
