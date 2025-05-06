import React, {useContext} from "react";
import {Box, IconButton, Typography, useTheme,} from "@mui/material";
import {ColorModeContext, tokens} from "../../theme.jsx";

// Icons
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

function TopBar() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

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
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>
            </Box>
        </Box>
    );
}

export default TopBar;
