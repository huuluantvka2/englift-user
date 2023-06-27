import { LoginSocial, LoginSocialSuccess } from "@/model/auth";
import { ApiResponse } from "@/model/common";
import apiBase from "./axiosBase";
import { UserItem } from "@/model/user";

const getProfile = (body: LoginSocial): Promise<ApiResponse<UserItem>> => {
    return apiBase.post(`/Users/Profile`, body)
}

export { getProfile };

