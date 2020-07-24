import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: localStorage.getItem('access_token'),
        user: null,
    },
    reducers: {
        // successful user login
        // tokens - object returned by api (access, refresh token)
        // user - user object
        loginUserSuccess: (state , action) => {
            state.accessToken = action.payload.tokens.access;
            state.user = action.payload.user;
        },
        logoutUser: (state, action) => {
            state.accessToken = "";
            state.user = null;
        },
    },
});

export const { loginUserSuccess, logoutUser } = authSlice.actions;

export default authSlice.reducer;