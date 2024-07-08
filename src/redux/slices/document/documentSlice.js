import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseDocumentURL } from "../../../utils/baseURL";

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
        });
        builder.addCase(createDocumentAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
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
    },
});

export default documentSlices.reducer;
