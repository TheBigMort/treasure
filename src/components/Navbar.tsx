import Link from "@components/Link";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { navDrawerAtom } from "@src/store/jotai";
import theme from "@styles/theme";
import { transition } from "@styles/utils";
import { useEthers, useLookupAddress } from "@usedapp/core";
import { Spin as Hamburger } from "hamburger-react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC } from "react";
import { FaTwitter } from "react-icons/fa";

const Navbar: FC = () => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useAtom(navDrawerAtom);
  const { activateBrowserWallet, activate, account, active } = useEthers();
  const ens = useLookupAddress();

  const router = useRouter();

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        backdropFilter: "blur(6px) saturate(300%)",
        WebkitBackdropFilter: "blur(6px) saturate(300%)",
        backgroundColor: "rgba(255,133,6,255)",
        border: "1px solid rgba(255, 255, 255, 0.015)",
        zIndex: 1201,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }} ml="2rem">
          <Typography fontFamily="Aleo Bold" fontSize="3rem">
            Treasure.
          </Typography>
        </Link>

        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-end"
          fontFamily="Aleo"
          sx={{
            display: "none",
            [theme.breakpoints.up("md")]: {
              display: "flex",
            },
          }}
        >
          {/*<Button*/}
          {/*  component={Link}*/}
          {/*  href="/dashboard"*/}
          {/*  color="secondary"*/}
          {/*  variant="text"*/}
          {/*  sx={*/}
          {/*    router.pathname.includes("/dashboard")*/}
          {/*      ? {*/}
          {/*          // position: "relative",*/}
          {/*          "&:after": {*/}
          {/*            content: '""',*/}
          {/*            position: "absolute",*/}
          {/*            left: 0,*/}
          {/*            bottom: 0,*/}
          {/*            width: "100%",*/}
          {/*            borderBottom: `1px solid ${theme.palette.secondary.main}`,*/}
          {/*          },*/}
          {/*        }*/}
          {/*      : {}*/}
          {/*  }*/}
          {/*>*/}
          {/*  Dashboard*/}
          {/*</Button>*/}
          <Link
            href="#faq"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: "none",
              transition,
              transitionDuration: "500ms",
              ":hover": {
                color: "#FFFFFF",
                cursor: "pointer",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography fontFamily="Aleo Bold" fontSize="1.5rem">
              FAQ
            </Typography>
          </Link>
          <Link
            href="#mint"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: "none",
              transition,
              transitionDuration: "500ms",
              ":hover": {
                color: "#FFFFFF",
                cursor: "pointer",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography fontFamily="Aleo Bold" fontSize="1.5rem">
              Mint
            </Typography>
          </Link>
          <Link
            href="#roadmap"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: "none",
              transition,
              transitionDuration: "500ms",
              ":hover": {
                color: "#FFFFFF",
                cursor: "pointer",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography fontFamily="Aleo Bold" fontSize="1.5rem">
              Roadmap
            </Typography>
          </Link>

          <Link
            href="https://twitter.com/TreasureNFTs"
            target="_blank"
            sx={{
              color: theme.palette.primary.main,
              transition,
              transitionDuration: "500ms",
              ":hover": {
                color: "#FFFFFF",
                cursor: "pointer",
                transform: "translateY(-2px)",
              },
            }}
          >
            <FaTwitter style={{ height: "24px", width: "24px" }} />
          </Link>
          {/*           <Link
            href="https://discord.gg/MxAu5GZCb2"
            target="_blank"
            sx={{
              color: "#FFFFFF",
              transition,
              transitionDuration: "500ms",
              ":hover": {
                color: theme.palette.secondary.main,
                cursor: "pointer",
                transform: "translateY(-2px)",
              },
            }}
          >
            <FaDiscord style={{ height: "24px", width: "24px" }} />
          </Link> */}
          <Button
            onClick={!active ? () => activateBrowserWallet() : undefined}
            color="primary"
            variant="contained"
            disabled={active}
          >
            {active ? (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "14ch",
                }}
              >
                {ens ?? account}
              </Typography>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </Stack>
        <Stack
          direction="row"
          spacing={1.2}
          alignItems="center"
          sx={{ [theme.breakpoints.up("md")]: { display: "none" } }}
        >
          <Button
            onClick={!active ? () => activateBrowserWallet() : undefined}
            color="secondary"
            variant="contained"
            disabled={active}
          >
            {active ? (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "14ch",
                }}
              >
                {ens ?? account}
              </Typography>
            ) : (
              "Connect Wallet"
            )}
          </Button>
          <Hamburger
            toggled={isNavDrawerOpen}
            toggle={setIsNavDrawerOpen}
            hideOutline
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
