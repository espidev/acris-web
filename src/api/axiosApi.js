import axios from 'axios';

// TODO
const baseURL = 'http://localhost:8000/api/';
const accessToken = localStorage.getItem('access_token');

const axiosAPI = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: accessToken ? 'Bearer ' + accessToken : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export default axiosAPI;
export function setNewHeaders(response) {
    axiosAPI.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
}

// refresh token if expired
axiosAPI.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === baseURL + 'token/refresh/') {
            // todo go to login page
            return Promise.reject(error);
        }

        if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            try {
                const refresh = localStorage.getItem('refresh_token');
                if (refresh) { // if there is a refresh token, try to login
                    const tokenParts = JSON.parse(atob(refresh.split('.')[1]));
                    const now = Math.ceil(Date.now() / 1000);

                    if (tokenParts.exp > now) {
                        try {
                            const response = await axiosAPI.post('token/refresh/', {refresh});
                            setNewHeaders(response);
                            originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
                            return axiosAPI(originalRequest);
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        console.log('Refresh token has expired', tokenParts.exp, now);
                        // todo go to login page
                    }
                } else { // no refresh token -> go to login page
                    console.log('Refresh token not available.');
                    // todo go to login page
                }
            } catch (e) {
                console.log(e);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        }
        return Promise.reject(error);
    }
);