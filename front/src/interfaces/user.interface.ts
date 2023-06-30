interface ICreateUser {
    email: string,
    password: string,
    role: string,
}

interface ILoginUser {
    email: string,
    password: string,
}

interface ILoginUserResponse {
    user_id: number,
    role: string,
    email: string,
    password: string,
    access_token: string
}

export type {ICreateUser, ILoginUser, ILoginUserResponse}