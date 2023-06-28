import { LoginSocial } from "@/model/auth";
import { ApiResponse } from "@/model/common";
import { UserItem } from "@/model/user";
import apiBase from "./axiosBase";

const getProfile = (body: LoginSocial): Promise<ApiResponse<UserItem>> => {
    return apiBase.post(`/Users/Profile`, body)
}

export { getProfile };

