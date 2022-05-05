import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from '@src/utils/createEmotionCache';
import theme from '@styles/theme';
import { Config, DAppProvider } from '@usedapp/core';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

const config: Config = {};
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <>
            <DefaultSeo
                titleTemplate="%s | Treasure"
                openGraph={{
                    type: 'website',
                    locale: 'en_EN',
                    url: 'https://treasurenfts.io',
                    site_name: 'AdvancedTreasure',
                    title: 'AdvancedTreasure',
                    images: [{ url: 'https://treasurenfts.io/assets/treasure-logo.jpeg' }],
                }}
            />
            <DAppProvider config={config}>
                <CacheProvider value={emotionCache}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </CacheProvider>
            </DAppProvider>
        </>
    );
}

export default MyApp;
