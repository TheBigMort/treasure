import { Icon, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

type RoadmapItemType = {
  title: string;
  content?: string;
  extras?: string[];
};

const RoadmapItem: FC<RoadmapItemType> = ({ title, content, extras }) => {
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

      {extras &&
        extras.map((elem) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            mt="0.6rem"
          >
            <Typography>{elem}</Typography>
          </Stack>
        ))}
    </Stack>
  );
};

export default RoadmapItem;
