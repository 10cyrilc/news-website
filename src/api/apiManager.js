import axiosInstance from "./axiosInstance.js";

export const getNewsCategories = async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;

};

export const getNews = async (category) => {
    if(category === "all") {
        const response = await axiosInstance.get("/news");
        return response.data;
    }
    const response = await axiosInstance.get(`/news?category=${category}`);
    return response.data;

};
