import {axiosInstance} from "./axios.service";
import {ICreateUser} from "../interfaces/";

const userService = {
    postOne: (body: ICreateUser) => axiosInstance.post('/users', body),
}

export {userService}