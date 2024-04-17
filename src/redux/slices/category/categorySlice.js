import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseCategoryURL } from "../../../utils/baseURL";

baseCategoryURL;
//action to redirect
const resetEditAction = createAction("category/reset");
const resetDeleteAction = createAction("category/delete/reset");
const resetAddAction = createAction("category/add/reset");

//create a new category
export const createCategoryAction = createAsyncThunk(
    "category/create",
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
            const { data } = await axios.post(
                baseCategoryURL,
                {
                    title: category?.title,
                },
                config
            );
            //dispatch action to reset the add category
            dispatch(resetAddAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch all categories
export const fetchAllCategoryAction = createAsyncThunk(
    "category/fetchAll",
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
            const { data } = await axios.get(baseCategoryURL, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//update categories
export const updateCategoryAction = createAsyncThunk(
    "category/update",
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
            const { data } = await axios.put(
                `${baseCategoryURL}/${category?.id}`,
                { title: category?.title },
                config
            );
            //dispatch action to reset the updated category
            dispatch(resetEditAction());
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
export const deleteCategoryAction = createAsyncThunk(
    "category/delete",
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
                `${baseCategoryURL}/${id}`,
                config
            );
            //dispatch action to reset the deleted category
            dispatch(resetDeleteAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch single categories
export const fetchCategoryAction = createAsyncThunk(
    "category/details",
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
            const { data } = await axios.get(
                `${baseCategoryURL}/${id}`,
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

//slices
const categorySlices = createSlice({
    name: "category",
    initialState: {},
    extraReducers: (builder) => {
        //create category
        builder.addCase(createCategoryAction.pending, (state, action) => {
            state.loading = true;
        });
        ////dispatch action add category
        builder.addCase(resetAddAction, (state, action) => {
            state.isCreated = true;
        });
        builder.addCase(createCategoryAction.fulfilled, (state, action) => {
            state.category = action?.payload;
            state.isCreated = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(createCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        // fetch all categories
        builder.addCase(fetchAllCategoryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllCategoryAction.fulfilled, (state, action) => {
            state.categoryList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchAllCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //update category
        builder.addCase(updateCategoryAction.pending, (state, action) => {
            state.loading = true;
        });
        ////dispatch action category update
        builder.addCase(resetEditAction, (state, action) => {
            state.isEdited = true;
        });
        builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
            state.updatedCategory = action?.payload;
            state.isEdited = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(updateCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //delete category
        builder.addCase(deleteCategoryAction.pending, (state, action) => {
            state.loading = true;
        });
        ////dispatch for redirect
        builder.addCase(resetDeleteAction, (state, action) => {
            state.isDeleted = true;
        });
        builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
            state.deletedCategory = action?.payload;
            state.isDeleted = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(deleteCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //fetch single category
        builder.addCase(fetchCategoryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
            state.category = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default categorySlices.reducer;
