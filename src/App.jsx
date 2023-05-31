import { useState } from "react";
import { Box, Divider, useTheme } from "@mui/material";
import { tokens } from "./theme";
import Home from "./components/jsx/Home";
import TopBar from "./components/jsx/Topbar";

function App() {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <>
      <TopBar />
      <Divider />
      <Home />
    </>
  );
}

export default App;
