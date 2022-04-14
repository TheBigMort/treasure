import { FC } from "react";
import { Stack, Typography, Icon } from "@mui/material";
import { HiOutlineChevronRight } from "react-icons/hi";
import theme from "@styles/theme";

type RoadmapItemType = {
  title: string;
  content?: string;
};

const RoadmapItem: FC<RoadmapItemType> = ({ title, content }) => {
  return (
    <Stack
      sx={{
        // borderBottom: `3px solid ${theme.palette.secondary.main}`,
        // border: `3px solid rgba(6, 255, 118, 0.35)`,
        "&:first-of-type": {
          mt: "0 !important",
        },
      }}
      flex={1}
      width="100%"
      // py={2}
    >
      <Stack direction="row" alignItems="baseline" justifyContent="center">
        <Icon
          color="secondary"
          sx={{ height: "16px", fontWeight: "bold" }}
          component={HiOutlineChevronRight}
        />
        <Typography
          fontWeight="bold"
          fontSize="1.6rem"
          sx={{ textTransform: "uppercase" }}
        >
          {title}
        </Typography>
      </Stack>
      {content && <Typography>{content}</Typography>}
    </Stack>
  );
};

export default RoadmapItem;
