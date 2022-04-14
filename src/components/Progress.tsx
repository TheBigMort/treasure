import React, { FC } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={Math.round(props.value) / 5.2}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          fontFamily="Work Sans"
          variant="body2"
          color="text.secondary"
          textAlign="center"
        >
          {props.value === 0
            ? "connect to mainnet"
            : `${Math.round(props.value)}/520`}
        </Typography>
      </Box>
    </Box>
  );
}

const Progress: FC<{ progress: number }> = ({ progress }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default Progress;
