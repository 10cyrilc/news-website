import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Typography,
    useTheme,
} from "@mui/material";
import  {useEffect, useState} from "react";
import {tokens} from "../../theme.jsx";
import ScrollToTop from "react-scroll-to-top";
import {getNews, getNewsCategories} from "../../api/apiManager.js";

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
                <ScrollToTop
                    smooth
                    width="25"
                    height="15"

                    // svgPath={
                    //   <ArrowCircleUpIcon
                    //     sx={{ color: colors.primary[400] }}
                    //     color="primary"
                    //   />
                    // }
                />
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
                            <CardRender item={item} key={item.title} colors={colors}/>
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
                            <CardRender item={item} key={item.title} colors={colors}/>
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

const CardRender = ({item, colors}) => {
    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                alt={item.title}
                height="340"
                image={item.imageUrl}
            />
            <CardContent>
                <Typography variant="body2" pt="10px" color="text.secondary">
                    Published On: {item.date} , {item.time}
                </Typography>
                <Typography variant="body2" pt="10px" color="text.secondary">
                    Author: {item.author}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" pt="20px">
                    {item.title}
                </Typography>
                <Typography variant="p" color="text.secondary">
                    {item.content}
                </Typography>
            </CardContent>
            <CardActions sx={{display: "flex", justifyContent: "center"}}>
                <Link
                    href={item.readMoreUrl}
                    color={colors.light[200]}
                    sx={{fontSize: "1.3em", textDecoration: "none"}}
                >
                    Read More
                </Link>
            </CardActions>
        </Card>
    );
};

export default Home;
