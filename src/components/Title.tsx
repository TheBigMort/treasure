import { Typography } from "@mui/material";
import { FC } from "react";

const Title: FC = ({ children }) => (
  <Typography
    variant="h3"
    textAlign="center"
    // fontFamily={["Franklin Gothic", "Roboto"].join()}
    fontFamily="Mazzard Light"
    sx={{
      fontWeight: "900",
      mb: "3rem",
    }}
    color="secondary"
  >
    {children}
  </Typography>
);

export default Title;
