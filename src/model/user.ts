import { IAudit } from "./common";


export interface UserItem extends IAudit {
    id: string,
    fullName: string,
    avatar?: string,
    active: boolean,
    deteted: boolean,
    email: string,
    oAuthId?: string,
    phoneNumber?: string,
    refCode?: string,
    typeLogin: number,
}
export interface UserLocal {
    id: string,
    avatar?: string,
    fullName: string,
    email: string,
}
export interface SignIn {
    email: string,
    password: string,
}

export interface SignUp {
    email: string,
    password: string,
    fullName: string,
}
