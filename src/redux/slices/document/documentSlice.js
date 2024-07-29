/* eslint-disable no-unused-vars */

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseDocumentURL } from "../../../utils/baseURL";
import { notifications } from "@mantine/notifications";

//action to redirect
const resetDocumentAction = createAction("document/add/reset");
const resetDocumentEditAction = createAction("document/edit/reset");
const resetDocumentDeleteAction = createAction("document/delete/reset");

//create document
export const createDocumentAction = createAsyncThunk(
    "document/created",
    async (document, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            const formData = new FormData();
            formData.append("title", document?.title);
            formData.append("description", document?.description);
            formData.append("file_path", document?.file_path);
            formData.append("file_mimetype", document?.file_mimetype);

            const { data } = await axios.post(
                baseDocumentURL,
                formData,
                config
            );

            //dispatch action
            dispatch(resetDocumentAction());

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

//fetch all document
export const fetchAllDocumentAction = createAsyncThunk(
    "document/fetchAll",
    async (document, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.get(`${baseDocumentURL}`, config);
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

//fetch all document
export const fetchAllDocumentNoPaginationAction = createAsyncThunk(
    "document/fetchAllNoPagination",
    async (document, { rejectWithValue, getState, dispatch }) => {
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
                `${baseDocumentURL}/nopagination`,
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

//delete categories
export const deleteDocumentAction = createAsyncThunk(
    "document/deleteDocument",
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
                `${baseDocumentURL}/${id}`,
                config
            );
            //dispatch action to reset the deleted document
            dispatch(resetDocumentDeleteAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const documentSlices = createSlice({
    name: "document",
    initialState: {},
    extraReducers: (builder) => {
        //create Document
        builder.addCase(createDocumentAction.pending, (state, action) => {
            state.loading = true;
            notifications.show({
                loading: true,
                title: "Loading",
                message: "Membuat Berita...",
                autoClose: 2000,
            });
        });
        ////dispatch action add post
        builder.addCase(resetDocumentAction, (state, action) => {
            state.isCreated = true;
        });
        builder.addCase(createDocumentAction.fulfilled, (state, action) => {
            state.documentCreated = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: false,
                title: "Sukses",
                message:
                    "Berhasil Mengunggah Dokumen. Harap tunggu 3 Detik, Halaman akan reload secara otomatis.",
                color: "green",
                autoClose: 2000,
            });
        });
        builder.addCase(createDocumentAction.rejected, (state, action) => {
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

        //fetch all document
        builder.addCase(fetchAllDocumentAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllDocumentAction.fulfilled, (state, action) => {
            state.documentList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchAllDocumentAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //fetch all document nopagination
        builder.addCase(
            fetchAllDocumentNoPaginationAction.pending,
            (state, action) => {
                state.loading = true;
            }
        );
        builder.addCase(
            fetchAllDocumentNoPaginationAction.fulfilled,
            (state, action) => {
                state.documentListNoPagination = action?.payload;
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            }
        );
        builder.addCase(
            fetchAllDocumentNoPaginationAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            }
        );

        //delete document
        builder.addCase(deleteDocumentAction.pending, (state, action) => {
            state.loading = true;
        });
        ////dispatch for redirect
        builder.addCase(resetDocumentDeleteAction, (state, action) => {
            state.isDeleted = true;
        });
        builder.addCase(deleteDocumentAction.fulfilled, (state, action) => {
            state.deletedDocument = action?.payload;
            state.isDeleted = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: false,
                title: "Sukses",
                message:
                    "Berhasil Menghapus Dokumen. Harap tunggu 3 Detik, Halaman akan reload secara otomatis.",
                color: "green",
                autoClose: 2000,
            });
        });
        builder.addCase(deleteDocumentAction.rejected, (state, action) => {
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

export default documentSlices.reducer;
