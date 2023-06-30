import {AxiosResponse} from "axios";

import {axiosInstance} from "./axios.service";
import {ILoginUser, ILoginUserResponse} from "../interfaces/";

const authService = {
    login: (data: ILoginUser): IRes<ILoginUserResponse> => axiosInstance.post('/auth/login', data)
}

export type IRes<T> = Promise<AxiosResponse<T>>

export {authService}