import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "@src/utils/createEmotionCache";
import theme from "@styles/theme";
import { Config, DAppProvider } from "@usedapp/core";
import type { AppProps } from "next/app";

const config: Config = {
  // readOnlyChainId: ChainId.Mainnet,
  // readOnlyUrls: {
  //   [ChainId.Mainnet]:
  //     "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  // },
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // const theme: any = useMemo(
  //   () =>
  //     createTheme({
  //       ...defaultTheme,
  //       palette: {
  //         ...defaultTheme.palette,
  //         mode: prefersDarkMode ? "dark" : "light",
  //       },
  //     }),
  //   [prefersDarkMode]
  // );

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      
      <DAppProvider config={config}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
              <CssBaseline />
              <Component {...pageProps} />
            </StyledEngineProvider>
          </ThemeProvider>
        </CacheProvider>
      </DAppProvider>

    </>
  );
}

// <script
//   async
//   defer
//   data-website-id="53eb0601-ae27-48cc-8596-fe26260e8379"
//   src="https://umami.yoki.dev/umami.js"
// ></script>;
export default MyApp;
