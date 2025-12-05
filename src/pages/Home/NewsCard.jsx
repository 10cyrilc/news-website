import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    useTheme,
    Chip,
} from "@mui/material";
import { tokens } from "../../theme";

const NewsCard = ({ item }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Card
            className="slide-up"
            sx={{
                maxWidth: 345,
                backgroundColor: colors.primary[400],
                backgroundImage: "none",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                },
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
            onClick={() => window.open(item.readMoreUrl, "_blank")}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    alt={item.title}
                    height="220"
                    image={item.imageUrl}
                    sx={{
                        objectFit: "cover",
                        filter: "brightness(0.9)",
                        transition: "filter 0.3s ease",
                        "&:hover": {
                            filter: "brightness(1)",
                        },
                    }}
                />
                <Chip
                    label={item.date.split(",")[0]}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        backdropFilter: "blur(4px)",
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography
                        variant="caption"
                        color={colors.greenAccent[500]}
                        fontWeight="600"
                        sx={{ textTransform: "uppercase", letterSpacing: "1px" }}
                    >
                        {item.author || "Unknown Author"}
                    </Typography>
                </Box>

                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight="700"
                    sx={{
                        lineHeight: 1.3,
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {item.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        lineHeight: 1.6,
                    }}
                >
                    {item.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NewsCard;