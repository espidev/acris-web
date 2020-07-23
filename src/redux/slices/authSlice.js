import { createSlice } from '@reduxjs/toolkit';
import {playerSlice} from "./playerSlice";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: localStorage.getItem('access_token'),
    },
    reducers: {
        loginUserSuccess: (state = localStorage.getItem('access_token'), action) => action.token,
        logoutUser: (state, action) => "",
    },
});

export const { loginUserSuccess, logoutUser } = playerSlice.actions;

export default authSlice.reducer;