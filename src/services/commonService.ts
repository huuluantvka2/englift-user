import { UserLocal } from "@/model/user"

export const setAccessToken = (access_token: string) => {
    localStorage.setItem('access_token', access_token)
}

export const getAccessToken = (): string | null => {
    return localStorage.getItem('access_token')
}

export const clearAccessToken = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
}

export const getProfileLocal = (): UserLocal | null => {
    let json = localStorage.getItem('profile');
    return json ? JSON.parse(localStorage.getItem('profile') as string) : null
}

export const setProfileLocal = (data: UserLocal) => {
    localStorage.setItem('profile', JSON.stringify(data))
}


