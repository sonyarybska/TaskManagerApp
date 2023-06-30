interface ICategory {
    category_id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
    tasks?: any,
    user_id: number
}

interface ICreateCategory {
    name: string,
    user_id: number
}

interface IUpdateCategory {
    name: string,
}

export type {ICategory, ICreateCategory, IUpdateCategory}