import Link from "@components/Link";
import { Button, Drawer, Stack } from "@mui/material";
import { navDrawerAtom } from "@src/store/jotai";
import theme from "@styles/theme";
import { transition } from "@styles/utils";
import { useAtom } from "jotai";
import React, { FC, useCallback } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";


const NavDrawer: FC = () => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useAtom(navDrawerAtom);
  const closeNavDrawer = useCallback(() => setIsNavDrawerOpen(false), []);
  return (
    <Drawer
      anchor="top"
      open={isNavDrawerOpen}
      onClose={closeNavDrawer}
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(18, 18, 18, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.015)",
        },
        "& .MuiDrawer-paper": {
          background: "none",
        },
      }}
    >
      <Stack
        spacing={1.2}
        sx={{
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(18, 18, 18, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.015)",
          pt: "80px",
          pb: "1rem",
        }}
        onClick={closeNavDrawer}
      >
        <Button component={Link} href="#mint" color="secondary" variant="text">
          MINT
        </Button>
        <Button
          component={Link}
          href="#roadmap"
          color="secondary"
          variant="text"
        >
          ROADMAP
        </Button>
        <Button component={Link} href="#faq" color="secondary" variant="text">
          FAQ
        </Button>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          mt="2rem !important"
        >
          <Link
            href="https://twitter.com/TreasureNFTs"
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
            <FaTwitter style={{ height: "32px", width: "32px" }} />
          </Link>
          <Link
            href=""
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
            <FaDiscord style={{ height: "32px", width: "32px" }} />
          </Link>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default NavDrawer;
