import { createSlice } from '@reduxjs/toolkit';
import {playerSlice} from "./playerSlice";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: localStorage.getItem('access_token'),
        user: null,
    },
    reducers: {
        loginUserSuccess: (state , action) => {
            state.token = action.payload.tokens.access;
            state.user = action.payload.user;
            return state;
        },
        logoutUser: (state, action) => {
            state.token = "";
            state.user = null;
            return state;
        },
    },
});

export const { loginUserSuccess, logoutUser } = playerSlice.actions;

export default authSlice.reducer;