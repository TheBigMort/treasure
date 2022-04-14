import { FC } from "react";
import MUIContainer from "@mui/material/Container";

const Container: FC = ({ children }) => {
  return (
    <MUIContainer
      component="main"
      maxWidth="lg"
      sx={{
        position: "relative",
        overflowX: "hidden",
        // overflowY: "scroll",
        pb: "3.5rem",
      }}
    >
      {children}
    </MUIContainer>
  );
};

export default Container;
