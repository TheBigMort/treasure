/* eslint-disable react/display-name */
import { Box, Slide } from '@mui/material/';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Footer from '@src/components/Footer';
import Navbar from '@src/components/Navbar';
import NavDrawer from '@src/components/NavDrawer';
import snackbarAtom from '@src/store/jotai';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { FC, forwardRef, useCallback } from 'react';

type LayoutProps = {
    seo: {
        title: string;
        description?: string;
        image?: string;
    };
};

function SlideTransition(props: any) {
    return <Slide {...props} direction="down" />;
}

const Alert = forwardRef((props, ref) => (
    <MuiAlert elevation={4} ref={ref as any} variant="filled" {...props} />
));

const Layout: FC<LayoutProps> = ({ children, seo }) => {
    const [snackbar, setSnackbar] = useAtom(snackbarAtom);
    const handleClose = useCallback(
        () => setSnackbar({ ...snackbar, isOpen: false }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [snackbar.isOpen]
    );
    const { title, description, image = '/assets/seo.jpg' } = seo ?? {};
    return (
        <>
            <NextSeo
                title={title}
                description={description}
                openGraph={{ title, description, images: [{ url: image }] }}
            />

            <Navbar />

            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    pb: '3.5rem',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                }}
            >
                {children}
                <Footer />
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbar.isOpen}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                autoHideDuration={3000}
            >
                {/* @ts-ignore */}
                <Alert
                    onClose={handleClose}
                    severity={snackbar.severity}
                    sx={
                        snackbar.severity === 'success'
                            ? { width: '100%', backgroundColor: '#06ff76', color: 'black' }
                            : {}
                    }
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <NavDrawer />
        </>
    );
};

export default Layout;
