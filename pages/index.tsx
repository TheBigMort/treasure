import Mint from "@components/Mint";
import Roadmap from "@components/Roadmap";
import { Stack } from "@mui/material";
import Container from "@src/components/Container";
import FAQ from "@src/components/FAQ";
import Layout from "@src/components/Layout";
import useMatchesMediaQuery from "@src/hooks/useMatchesMediaQuery";
import Head from "next/head";
import React from "react";
import { Parallax } from "react-parallax";

// contractURI - bafybeihvwstfo6frl4bjadfzsalvdotr5x4cstfwccoa4mo2p6kuetzvay
export default function Home() {
  const mdUp = useMatchesMediaQuery("up", "md");
  const mdDown = useMatchesMediaQuery("down", "md");

  return (
    <Layout seo={{ title: "" }}>
      <Head>
        <title>TreasureNFT</title>
      </Head>
      <Parallax
        bgImage="/assets/bg-image.jpg"
        strength={-200}
        bgStyle={{ backgroundPosition: "-50%" }}
      >
        <div style={{ height: 800 }}></div>
      </Parallax>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          pt="1.5rem"
          pb="3rem"
        >
          <Stack>
            <Mint />
          </Stack>
        </Stack>


        <Roadmap />
      </Container>


      <Container>
        <FAQ />
      </Container>
    </Layout>
  );
}
