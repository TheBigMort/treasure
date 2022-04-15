import Mint from "@components/Mint";
import Roadmap from "@components/Roadmap";
import { Stack } from "@mui/material";
import Container from "@src/components/Container";
import FAQ from "@src/components/FAQ";
import Layout from "@src/components/Layout";
import Masthead from "@src/components/masthead";
import useMatchesMediaQuery from "@src/hooks/useMatchesMediaQuery";
import Head from "next/head";
import React from "react";

// contractURI - bafybeihvwstfo6frl4bjadfzsalvdotr5x4cstfwccoa4mo2p6kuetzvay
export default function Home() {
  const mdDown = useMatchesMediaQuery("down", "md");

  return (
    <Layout seo={{ title: "" }}>
      <Head>
        <title>TreasureNFT</title>
      </Head>
      <Masthead />
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
