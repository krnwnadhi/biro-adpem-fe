/* eslint-disable no-unused-vars */

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseGalleryURL } from "../../../utils/baseURL";
import { notifications } from "@mantine/notifications";

//action to redirect
const resetGalleryAction = createAction("gallery/add/reset");
const resetGalleryEditAction = createAction("gallery/edit/reset");
const resetGalleryDeleteAction = createAction("gallery/delete/reset");

//create action
export const createGalleryAction = createAsyncThunk(
    "gallery/created",
    async (gallery, { rejectWithValue, getState, dispatch }) => {
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
            formData.append("title", gallery?.title);
            formData.append("image", gallery?.image);

            const { data } = await axios.post(baseGalleryURL, formData, config);

            //dispatch action
            dispatch(resetGalleryAction());

            // console.log(data);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch all gallery
export const fetchAllGalleryAction = createAsyncThunk(
    "gallery/fetchAll",
    async (gallery, { rejectWithValue, getState, dispatch }) => {
        // get user token

        const user = getState()?.users;
        const { userAuth } = user;
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${userAuth?.token}`;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            const { data } = await axios.get(`${baseGalleryURL}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

// fetch all gallery no pagination
export const fetchAllGalleryNoPaginationAction = createAsyncThunk(
    "gallery/fetchAllNoPagination",
    async (gallery, { rejectWithValue, getState, dispatch }) => {
        // get user token

        const user = getState()?.users;
        const { userAuth } = user;
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${userAuth?.token}`;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            const { data } = await axios.get(
                `${baseGalleryURL}/nopagination`,
                config
            );
            await new Promise((resolve) => setTimeout(resolve, 1500));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch detail gallery action
export const fetchDetailGalleryAction = createAsyncThunk(
    "gallery/fetchDetailGallery",
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
            const { data } = await axios.get(`${baseGalleryURL}/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//update gallery
export const updateGalleryAction = createAsyncThunk(
    "gallery/update",
    async (gallery, { rejectWithValue, getState, dispatch }) => {
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
                `${baseGalleryURL}/${gallery?.id}`,
                { title: gallery?.title },
                config
            );
            //dispatch action to reset the updated category
            dispatch(resetGalleryEditAction());
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
export const deleteGalleryAction = createAsyncThunk(
    "gallery/deletePost",
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
            const { data } = await axios.delete(
                `${baseGalleryURL}/${id}`,
                config
            );
            //dispatch
            dispatch(resetGalleryDeleteAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const gallerySlices = createSlice({
    name: "gallery",
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(createGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        ////dispatch action add post
        builder.addCase(resetGalleryAction, (state, action) => {
            state.isCreated = true;
        });
        builder.addCase(createGalleryAction.fulfilled, (state, action) => {
            state.galleryCreated = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: false,
                title: "Sukses",
                message: "Berhasil mengunggah foto",
                color: "green",
                autoClose: 2000,
            });
        });
        builder.addCase(createGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
            notifications.show({
                title: "Error",
                message: state.appError,
                color: "red",
                autoClose: 3000,
            });
        });

        //fetch all gallery
        builder.addCase(fetchAllGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllGalleryAction.fulfilled, (state, action) => {
            state.galleryList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchAllGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //fetch all gallery noPagination
        builder.addCase(
            fetchAllGalleryNoPaginationAction.pending,
            (state, action) => {
                state.loading = true;
            }
        );
        builder.addCase(
            fetchAllGalleryNoPaginationAction.fulfilled,
            (state, action) => {
                state.galleryList = action?.payload;
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            }
        );
        builder.addCase(
            fetchAllGalleryNoPaginationAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            }
        );

        //fetch detail gallery
        builder.addCase(fetchDetailGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDetailGalleryAction.fulfilled, (state, action) => {
            state.galleryDetail = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchDetailGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //update gallery
        builder.addCase(updateGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        ////dispatch action category update
        builder.addCase(resetGalleryEditAction, (state, action) => {
            state.isEdited = true;
        });
        builder.addCase(updateGalleryAction.fulfilled, (state, action) => {
            state.updatedGallery = action?.payload;
            state.isEdited = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: false,
                title: "Sukses",
                message: "Judul berhasil diperbarui",
                color: "green",
                autoClose: 2000,
            });
        });
        builder.addCase(updateGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
            notifications.show({
                title: "Error",
                message: state.appError,
                color: "red",
                autoClose: 3000,
            });
        });

        //delete gallery
        builder.addCase(deleteGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetGalleryDeleteAction, (state, action) => {
            state.isDeleted = true;
        });
        builder.addCase(deleteGalleryAction.fulfilled, (state, action) => {
            state.galleryDeleted = action?.payload;
            state.isDeleted = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: false,
                title: "Sukses",
                message: "Berhasil menghapus foto",
                color: "green",
                autoClose: 2000,
            });
        });
        builder.addCase(deleteGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
            notifications.show({
                title: "Error",
                message: state.appError,
                color: "red",
                autoClose: 3000,
            });
        });
    },
});

export default gallerySlices.reducer;
