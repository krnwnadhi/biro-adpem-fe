import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseUserURL } from "../../../utils/baseURL";
import { notifications } from "@mantine/notifications";
import secureLocalStorage from "react-secure-storage";

//register action
export const registerUserAction = createAsyncThunk(
    "users/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };

            const { data } = await axios.post(
                `${baseUserURL}/register`,
                user,
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

//login action
export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };

            await new Promise((resolve) => setTimeout(resolve, 1500));

            const { data } = await axios.post(
                `${baseUserURL}/login`,
                userData,
                config
            );
            // save to local storage
            secureLocalStorage.setItem("logInfo", JSON.stringify(data));

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//reset password token
export const passwordResetTokenAction = createAsyncThunk(
    "password/token",
    async (email, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };

            const { data } = await axios.post(
                `${baseUserURL}/forget-password-token`,
                { email },
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

//Password reset
export const passwordResetAction = createAsyncThunk(
    "password/reset",
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        //http call
        try {
            const { data } = await axios.put(
                `${baseUserURL}/reset-password`,
                { password: user?.password, token: user?.token },
                config
            );
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//get user from local storage and place it into the store
const userLoginFormStorage = secureLocalStorage.getItem("logInfo")
    ? JSON.parse(secureLocalStorage.getItem("logInfo"))
    : null;

//logout from local storage
export const logoutUserAction = createAsyncThunk(
    "user/logout",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            secureLocalStorage.removeItem("logInfo");
            // secureLocalStorage.removeItem("logInfo", JSON.stringify(userData));
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//slices
const usersSLices = createSlice({
    name: "user",
    initialState: {
        userAuth: userLoginFormStorage,
    },
    extraReducers: (builder) => {
        //register users
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.registered = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //login user
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.isLogin = false;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: true,
                title: "Loading",
                message: "Memuat data...",
                autoClose: 2000,
            });
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isLogin = true;
            state.userAuth = action?.payload;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: false,
                title: "Sukses",
                message: "Login berhasil!",
                color: "green",
                autoClose: 3000,
            });
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.isLogin = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
            notifications.show({
                title: "Error",
                message: state.appError,
                color: "red",
                autoClose: 3000,
            });
        });

        //logout user
        builder.addCase(logoutUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: true,
                title: "Loading",
                message: "Memuat data...",
                autoClose: 2000,
            });
        });
        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
            notifications.show({
                loading: false,
                title: "Sukses",
                message: "Log Out berhasil!",
                color: "green",
                autoClose: 2000,
            });
        });
        builder.addCase(logoutUserAction.rejected, (state, action) => {
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

        //passwordResetToken
        builder.addCase(passwordResetTokenAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
            state.loading = false;
            state.passwordToken = action?.payload;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //passwordReset
        builder.addCase(passwordResetAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(passwordResetAction.fulfilled, (state, action) => {
            state.loading = false;
            state.passwordReset = action?.payload;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(passwordResetAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default usersSLices.reducer;
