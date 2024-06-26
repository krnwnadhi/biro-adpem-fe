import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { basePostURL } from "../../../utils/baseURL";

//action to redirect
const resetPostAction = createAction("post/add/reset");
const resetPostEditAction = createAction("post/edit/reset");
const resetPostDeleteAction = createAction("post/delete/reset");

//create post action
export const createPostAction = createAsyncThunk(
    "post/created",
    async (post, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const formData = new FormData();
            formData.append("title", post?.title);
            formData.append("description", post?.description);
            formData.append("category", post?.category);
            formData.append("image", post?.image);

            const { data } = await axios.post(basePostURL, formData, config);
            //dispatch action
            dispatch(resetPostAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch all post action
export const fetchAllPostAction = createAsyncThunk(
    "post/fetchAll",
    async (category, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.get(
                `${basePostURL}?category=${category}`,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch detail post action
export const fetchDetailPostAction = createAsyncThunk(
    "post/fetchDetailPost",
    async (id, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.get(`${basePostURL}/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//update post action
export const updatePostAction = createAsyncThunk(
    "post/updatePost",
    async (post, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.put(
                `${basePostURL}/${post?.id}`,
                post,
                config
            );
            //dispatch
            dispatch(resetPostEditAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//delete post action
export const deletePostAction = createAsyncThunk(
    "post/deletePost",
    async (postId, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.delete(
                `${basePostURL}/${postId}`,
                config
            );
            //dispatch
            dispatch(resetPostDeleteAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//slices
const postSlices = createSlice({
    name: "post",
    initialState: {},
    extraReducers: (builder) => {
        //create post
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
        });
        ////dispatch action add post
        builder.addCase(resetPostAction, (state, action) => {
            state.isCreated = true;
        });
        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.postCreated = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //fetch all post
        builder.addCase(fetchAllPostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllPostAction.fulfilled, (state, action) => {
            state.postList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchAllPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //fetch detail post
        builder.addCase(fetchDetailPostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDetailPostAction.fulfilled, (state, action) => {
            state.postDetail = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchDetailPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //update post
        builder.addCase(updatePostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostEditAction, (state, action) => {
            state.isUpdated = true;
        });
        builder.addCase(updatePostAction.fulfilled, (state, action) => {
            state.postUpdated = action?.payload;
            state.isUpdated = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(updatePostAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //delete post
        builder.addCase(deletePostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostDeleteAction, (state, action) => {
            state.isDeleted = true;
        });
        builder.addCase(deletePostAction.fulfilled, (state, action) => {
            state.postUpdated = action?.payload;
            state.isDeleted = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(deletePostAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default postSlices.reducer;
