import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Footer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : "#f5f5f5",
                color: theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[900],
                py: 3,
                borderTop: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                textAlign: "center",
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} News Website. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
