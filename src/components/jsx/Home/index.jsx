import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Link,
  useTheme,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../data";
import { tokens } from "../../../theme";

function Home() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState(0);
  const [fetchedNews, setFetchedNews] = useState({});
  const [news, setNews] = useState([]);
  const [reversedNews, setReversedNews] = useState([]);

  const [error, setError] = useState(null);

  const values = [
    "all",
    "national",
    "business",
    "sports",
    "world",
    "politics",
    "technology",
    "startup",
    "entertainment",
    "miscellaneous",
    "hatke",
    "science",
    "automobile",
  ];

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  // Fetch News

  useEffect(() => {
    axios
      .get(`${BASE_URL}${category}`)
      .then((res) => {
        setFetchedNews(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [category]);

  // Sort News

  useEffect(() => {
    const newNews = fetchedNews?.data?.sort(
      (a, b) =>
        new Date(a?.date?.split(",")[0] + " " + a?.time) -
        new Date(b?.date?.split(",")[0] + " " + b?.time)
    );
    setNews(newNews);
    setReversedNews(newNews?.slice().reverse());
  }, [fetchedNews]);

  if (fetchedNews.success && error === null) {
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" p="20px 50px">
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                {values.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
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
              <CardRender item={item} key={item.id} />
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
              <CardRender item={item} key={item.id} />
            ))}
          </Box>
        )}
      </Box>
    );
  } else if (error !== null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        Error While Loading: {error}
      </Box>
    );
  } else {
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
        <CircularProgress color="secondary" />
      </Box>
    );
  }
}
const CardRender = ({ item }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ maxWidth: 345 }}>
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
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Link
          href={item.readMoreUrl}
          color={colors.light[200]}
          sx={{ fontSize: "1.3em", textDecoration: "none" }}
        >
          Read More
        </Link>
      </CardActions>
    </Card>
  );
};

export default Home;
