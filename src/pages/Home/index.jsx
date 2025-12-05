import {
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    useTheme,
    Typography,
    Button,
    Container,
    Grid,
    Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme.jsx";
import { getNews, getNewsCategories } from "../../api/apiManager.js";
import NewsCard from "./NewsCard.jsx";
import ScrollToTopButton from "../../components/ScrollToTop.jsx";

function Home() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState(0);
    const [fetchedNews, setFetchedNews] = useState({});
    const [categories, setCategories] = useState([]);
    const [news, setNews] = useState([]);
    const [reversedNews, setReversedNews] = useState([]);
    const [error, setError] = useState(null);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    // Fetch Categories
    const getCategories = async () => {
        const data = await getNewsCategories();
        const categoryList = data.categories;
        categoryList.unshift("all");
        setCategories(categoryList);
    };

    const fetchNews = async () => {
        try {
            const data = await getNews(category);
            setFetchedNews(data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        fetchNews();
    }, [category]);

    // Sort News
    useEffect(() => {
        const newNews = fetchedNews?.data?.sort(
            (a, b) =>
                new Date(a?.date?.split(",")[0] + " " + a?.time) -
                new Date(b?.date?.split(",")[0] + " " + b?.time)
        );
        setReversedNews(newNews);
        setNews(newNews?.slice().reverse());
    }, [fetchedNews]);

    // Render News if fetched
    if (fetchedNews.success && error === null) {
        const currentNews = sort ? news : reversedNews;
        const featuredArticle = currentNews?.[0];
        const otherArticles = currentNews?.slice(1);

        return (
            <Box pb={10}>
                <ScrollToTopButton />

                {/* HERO SECTION */}
                {featuredArticle && (
                    <Box
                        className="fade-in"
                        sx={{
                            position: "relative",
                            height: "60vh",
                            width: "100%",
                            backgroundImage: `url(${featuredArticle.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                            alignItems: "flex-end",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2))",
                            },
                        }}
                    >
                        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, pb: 6, pl: { xs: 2, md: 4 } }}>
                            <Chip
                                label="Featured"
                                color="secondary"
                                sx={{ mb: 3, fontWeight: "bold", fontSize: "0.9rem" }}
                            />
                            <Typography
                                variant="h1"
                                color="white"
                                fontWeight="900"
                                sx={{
                                    fontSize: { xs: "2rem", md: "3.5rem" },
                                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                                    maxWidth: "900px",
                                    mb: 3,
                                    lineHeight: 1.2,
                                }}
                            >
                                {featuredArticle.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="rgba(255,255,255,0.9)"
                                sx={{
                                    maxWidth: "700px",
                                    mb: 4,
                                    fontSize: { xs: "1rem", md: "1.25rem" },
                                    lineHeight: 1.6,
                                    textShadow: "0 1px 4px rgba(0,0,0,0.5)"
                                }}
                            >
                                {featuredArticle.content.substring(0, 150)}...
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => window.open(featuredArticle.readMoreUrl, "_blank")}
                                sx={{
                                    padding: "10px 24px",
                                    fontSize: "1rem",
                                    borderRadius: "30px",
                                    textTransform: "none",
                                    fontWeight: "bold"
                                }}
                            >
                                Read Full Story
                            </Button>
                        </Container>
                    </Box>
                )}

                <Container maxWidth="xl" sx={{ mt: 6 }}>
                    {/* FILTERS */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={4}
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Typography variant="h3" fontWeight="bold">
                            Latest News
                        </Typography>
                        <Box display="flex" gap={2}>
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={category}
                                    label="Category"
                                    onChange={handleCategoryChange}
                                    sx={{ borderRadius: "12px" }}
                                >
                                    {categories.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item.toUpperCase()}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={sort}
                                    label="Sort By"
                                    onChange={handleSortChange}
                                    sx={{ borderRadius: "12px" }}
                                >
                                    <MenuItem value={0}>Latest First</MenuItem>
                                    <MenuItem value={1}>Oldest First</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* NEWS GRID */}
                    <Grid container spacing={4}>
                        {otherArticles?.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.title}>
                                <NewsCard item={item} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        );
    } else if (error !== null) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <Typography variant="h5" color="error">
                    Error While Loading: {error.message || error}
                </Typography>
            </Box>
        );
    } else {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                sx={{
                    "& .MuiCircularProgress-root": {
                        width: "80px !important",
                        height: "80px !important",
                    },
                }}
            >
                <CircularProgress color="secondary" />
            </Box>
        );
    }
}

export default Home;
