import {obtainToken, logout} from "../../api/auth";
import {authSlice} from "../slices/authSlice";
import {store} from "../store";
import axiosAPI from "../../api/axiosApi";

export async function loginUser(username, password) {
    try {
        const response = await obtainToken(username, password);
        const userRes = await axiosAPI.get('user');
        store.dispatch(authSlice.actions.loginUserSuccess({
            tokens: response.data,
            user: userRes.data,
        }));
    } catch (error) {
        console.log('Error obtaining token. ' + error);
    }
}

export async function logoutUser() {
    await logout();
    store.dispatch(authSlice.actions.logoutUser());
}
