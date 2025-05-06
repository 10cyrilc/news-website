import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, useTheme,} from "@mui/material";
import {useEffect, useState} from "react";
import {tokens} from "../../theme.jsx";
import {getNews, getNewsCategories} from "../../api/apiManager.js";
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
        setCategories(categoryList)
    }

    const fetchNews = async () => {
        try {
            const data = await getNews(category);
            setFetchedNews(data);
        } catch (error) {
            setError(error);
        }
    }

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
        return (
            <Box>
                <ScrollToTopButton />
                <Box display="flex" justifyContent="space-between" p="20px 50px">
                    <Box sx={{minWidth: 120}}>
                        <FormControl>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                label="Category"
                                onChange={handleCategoryChange}
                            >
                                {categories.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{minWidth: 120}}>
                        <FormControl>
                            <InputLabel>Sort By</InputLabel>
                            <Select value={sort} label="sort" onChange={handleSortChange}>
                                <MenuItem value={0}>Latest First</MenuItem>
                                <MenuItem value={1}>Oldest First</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {sort ? (
                    <Box
                        p="20px"
                        display="flex"
                        justifyContent="space-evenly"
                        gap="20px"
                        flexWrap="wrap"
                    >
                        {news.map((item) => (
                            <NewsCard item={item} key={item.title} colors={colors}/>
                        ))}
                    </Box>
                ) : (
                    <Box
                        p="20px"
                        display="flex"
                        justifyContent="space-evenly"
                        gap="20px"
                        flexWrap="wrap"
                    >
                        {reversedNews?.map((item) => (
                            <NewsCard item={item} key={item.title} colors={colors}/>
                        ))}
                    </Box>
                )}
            </Box>
        );
    } else if (error !== null) {
        // Show Error
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                Error While Loading: {error}
            </Box>
        );
    } else {
        // Show loading screen
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="90dvh"
                sx={{
                    "& .MuiCircularProgress-root": {
                        width: "90px !important",
                        height: "90px !important",
                    },
                }}
            >
                <CircularProgress color="secondary"/>
            </Box>
        );
    }
}


export default Home;
