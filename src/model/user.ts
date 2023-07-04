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
    totalDateStudied: number,
    dateTimeOffset: number,
    lastTimeStudy: string,
    totalWords: number,
    address?: string,
    timeRemind?: number,
    isNotify?: boolean,
    introduce?: string,
    gender?: boolean
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

export interface UserUpdate {
    fullName: string,
    address?: string,
    timeRemind?: number | string,
    phoneNumber?: string,
    isNotify?: boolean,
    refCode?: string,
    introduce?: string
    gender?: boolean
}

export interface ReportRequest {
    offsetTime: number,
    days: number
}

export interface ReportWords {
    datas: number[],
    categories: string[],
    totalLessons: 5,
    totalWords: 99,
    createdAt: string,
    lastTimeStudy: string
}