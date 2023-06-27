export interface LoginSocial {
    accessToken: string,
    uid: string,
    typeLogin: number

}
export interface LoginSuccess {
    accessToken: string,
    expiration: string,
    userId: string,
    fullName?: string,
    avatar?: string,
    email?: string,
}