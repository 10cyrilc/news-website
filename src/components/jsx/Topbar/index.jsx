import React, { useContext } from "react";
import {
  IconButton,
  InputBase,
  useTheme,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";

// Icons
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

function TopBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex" justifyContent="space-between" p="10px 50px">
      <Box display="flex">
        <Typography variant="h1" fontWeight="700">
          News
        </Typography>
      </Box>

      <Box
        display="flex"
        sx={{
          "& .MuiSvgIcon-fontSizeMedium": {
            fontSize: "1.3em",
          },
        }}
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}

export default TopBar;
