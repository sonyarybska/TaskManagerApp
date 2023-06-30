import axios, {AxiosResponse} from "axios";

let axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': "http://localhost:4000"
    }
});

export type IRes<T> = Promise<AxiosResponse<T>>

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
});

export {axiosInstance};