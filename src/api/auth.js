import axiosAPI, {setNewHeaders} from './axiosApi';

export async function obtainToken(username, password) {
    const response = await axiosAPI.post("token/", {username, password});
    setNewHeaders(response);
    return response;
}

export async function refreshToken(refresh) {
    const response = await axiosAPI.post('token/refresh/', {refresh})
    setNewHeaders(response);
    return response;
}

export async function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export const isAuthenticated = () => localStorage.getItem('access_token');