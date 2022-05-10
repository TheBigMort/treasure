import { createTheme } from '@mui/material/styles';

export const defaultTheme = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#313131',
            // main: '#313131',

            dark: '#0e1c56',
            // main: '#ff2e93',
        },
        secondary: {
            main: '#FF8F00',
            // main: '#FF8F00',

            // main: '#00e6b3',
        },
        // twitter: {
        //   main: "#09a2d9",
        // },
        // discord: {
        //   main: "#6338fe",
        // },
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
