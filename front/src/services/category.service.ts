import {axiosInstance} from "./axios.service";
import {ICategory, ICreateCategory, IUpdateCategory} from "../interfaces/";
import {IRes} from "./auth.service";

const categoryService = {
    getAllByUser: (id:number):IRes<ICategory[]> =>  axiosInstance.get(`/categories/${id}`),
    postOne: (body:ICreateCategory) => axiosInstance.post('/categories', body),
    putOne: (body:IUpdateCategory,id:number) => axiosInstance.put(`/categories/${id}`, body),
    deleteOne: (id:number) =>  axiosInstance.delete(`/categories/${id}`)
}

export {categoryService}