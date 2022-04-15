import Mint from "@components/Mint";
import Roadmap from "@components/Roadmap";
import { Stack } from "@mui/material";
import Container from "@src/components/Container";
import FAQ from "@src/components/FAQ";
import Layout from "@src/components/Layout";
import useMatchesMediaQuery from "@src/hooks/useMatchesMediaQuery";
import { ScrollContext } from "@src/utils/scroll-observer";
import Head from "next/head";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Parallax } from "react-parallax";

// contractURI - bafybeihvwstfo6frl4bjadfzsalvdotr5x4cstfwccoa4mo2p6kuetzvay
export default function Home() {
  const mdUp = useMatchesMediaQuery("up", "md");
  const mdDown = useMatchesMediaQuery("down", "md");
  const [imageLoaded, setImageLoaded] = useState(false);
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  let progress = 0;

  const { current: elContainer } = refContainer;

  if (elContainer) {
      progress = Math.min(1, scrollY / elContainer.clientHeight);
  }
  const handleImageLoaded = useCallback(() => {
      setImageLoaded(true);
  }, []);
  return (
    <Layout seo={{ title: "" }}>
      <Head>
        <title>TreasureNFT</title>
      </Head>

        <Parallax
          bgImage="/assets/bg-image.jpg"
          strength={300}
          bgStyle={{ backgroundPosition: "-100%" }}
        >
          <div style={{ height: '100vh', width: '100vw' }}></div>
        </Parallax>

      <Container>
        <Stack pt="3rem">
          <Roadmap />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          pt="1.5rem"
          pb="3rem"
        >
          <Mint />
        </Stack>
      </Container>

      <Container>
        <FAQ />
      </Container>
    </Layout>
  );
}
