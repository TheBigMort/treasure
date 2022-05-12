import { createTheme } from '@mui/material/styles';

export const defaultTheme = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#313131',
        },
        secondary: {
            main: '#FF8F00',
        },
    },
    typography: {
        fontFamily: [
            'Franklin Gothic',
            'SF Pro Display',
            'SF Pro',
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {},
        },
    },
};

// @ts-ignore
const theme = createTheme({
    ...defaultTheme,
});

export default theme;
