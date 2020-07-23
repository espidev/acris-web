import {obtainToken, logout} from "../../components/api/auth";
import {authSlice} from "../slices/authSlice";

export function loginUser(username, password) {
    return async function (dispatch) {
        try {
            const response = await obtainToken(username, password);
            dispatch(authSlice.actions.loginUserSuccess(response.data.access));
        } catch (error) {
            console.log('Error obtaining token. ' + error);
        }
    };
}

export function logoutUser() {
    return async function (dispatch) {
        await logout();
        dispatch(authSlice.actions.logoutUser());
    };
}
