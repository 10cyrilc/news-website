import React, { useContext } from "react";
import { Box, IconButton, Typography, useTheme, Container } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme.jsx";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

function TopBar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: theme.palette.mode === "dark" ? "rgba(20, 27, 45, 0.85)" : "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
                borderBottom: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                transition: "all 0.3s ease",
            }}
        >
            <Container maxWidth="xl">
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    {/* LOGO */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                            variant="h3"
                            fontWeight="900"
                            sx={{
                                background: `linear-gradient(45deg, ${colors.blueAccent[400]}, ${colors.greenAccent[400]})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                letterSpacing: "-1px",
                                cursor: "pointer",
                            }}
                        >
                            NEWS.
                        </Typography>
                    </Box>

                    {/* ICONS */}
                    <Box display="flex" gap={1}>
                        <IconButton onClick={colorMode.toggleColorMode}>
                            {theme.palette.mode === "dark" ? (
                                <DarkModeOutlinedIcon />
                            ) : (
                                <LightModeOutlinedIcon />
                            )}
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default TopBar;
