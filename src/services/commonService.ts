import { UserLocal } from "@/model/user"

export const setAccessToken = (access_token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', access_token)
    }
}

export const getAccessToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('access_token')
    } else return null
}

export const clearAccessToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('profile')
    }

}

export const getProfileLocal = (): UserLocal | null => {
    if (typeof window !== 'undefined') {
        let json = localStorage.getItem('profile');
        return json ? JSON.parse(localStorage.getItem('profile') as string) : null
    } else return null
}

export const setProfileLocal = (data: UserLocal) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('profile', JSON.stringify(data))
    }
}


