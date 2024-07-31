import categoriesReducer from "../slices/category/categorySlice";
import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "../slices/document/documentSlice";
import galleryReducer from "../slices/gallery/gallerySlice";
import postReducer from "../slices/posts/postSlice";
import usersReducer from "../slices/users/usersSlices";

const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoriesReducer,
        post: postReducer,
        document: documentReducer,
        gallery: galleryReducer,
    },
    devTools: false,
});

export default store;
