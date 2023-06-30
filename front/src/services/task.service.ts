import {axiosInstance, IRes} from "./axios.service";
import {FormikValues} from "formik";
import {ITask} from "../interfaces/";

const taskService = {
    getAllByCategory: (id: number): IRes<ITask[]> => axiosInstance.get(`/tasks/category/${id}`),
    getOne: (id: number | null): IRes<ITask> => axiosInstance.get(`/tasks/${id}`),
    postOne: (body: FormikValues) => axiosInstance.post('/tasks', body),
    putOne: (body: {
        [p: string]: any;
        category_id: number
    }, id: number | null) => axiosInstance.put(`/tasks/${id}`, body),
    deleteOne: (id: number | null) => axiosInstance.delete(`/tasks/${id}`)
}

export {taskService}