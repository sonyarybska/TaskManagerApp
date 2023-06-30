import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {axiosInstance} from "../services/axios.service";

export function ResponseInterceptor() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const interceptorId = useRef(null);

    useEffect(() => {
        axiosInstance.interceptors.response.use((config) => {
            return config;
        }, async (error) => {
            if (error?.response?.status === 403) {
                navigate('/login');
                return true;
            }
            throw error;
        })
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            axiosInstance.interceptors.response.eject(interceptorId.current!);
        };
    }, [dispatch]);

    axiosInstance.interceptors.request.use((config) => {
        console.log('djjd');
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        }
        return config;
    });

    return null;
}
