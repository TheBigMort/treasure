import Roadmap from '@components/Roadmap';
import Container from '@src/components/Container';
import FAQ from '@src/components/FAQ';
import Layout from '@src/components/Layout';
import Masthead from '@src/components/masthead';
import Timer from '@src/components/timer';
import Head from 'next/head';
import React from 'react';

// contractURI - bafybeihvwstfo6frl4bjadfzsalvdotr5x4cstfwccoa4mo2p6kuetzvay
export default function Home() {
    return (
        <Layout seo={{ title: '' }}>
            <Head>
                <title>TreasureNFT</title>
            </Head>
            <Masthead />
            <Container>
                <Roadmap />
                <Timer />

                <FAQ />
            </Container>
        </Layout>
    );
}
