import { LoginSocial, LoginSuccess } from "@/model/auth";
import { ApiResponse, SingleId } from "@/model/common";
import apiBase from "./axiosBase";
import { SignIn, SignUp } from "@/model/user";

const loginSocial = (body: LoginSocial): Promise<ApiResponse<LoginSuccess>> => {
    return apiBase.post("/Auths/SigninSocial", body)
}

const signUpSystem = (body: SignUp): Promise<ApiResponse<SingleId>> => {
    return apiBase.post("/Auths/Signup", body)
}

const signInSystem = (body: SignIn): Promise<ApiResponse<LoginSuccess>> => {
    return apiBase.post("/Auths/Signin", body)
}

export { loginSocial, signUpSystem, signInSystem };

