import { ApiResponse, SingleId } from "@/model/common";
import { ReportRequest, ReportWords, UserItem, UserUpdate } from "@/model/user";
import apiBase from "./axiosBase";


const getProfileByToken = (): Promise<ApiResponse<UserItem>> => {
    return apiBase.get(`/Users/Profile`)
}

const updateUserByToken = (body: UserUpdate): Promise<ApiResponse<SingleId>> => {
    return apiBase.put(`/Users/Profile`, body)
}

const getReports = (body: ReportRequest): Promise<ApiResponse<ReportWords>> => {
    return apiBase.post(`/Users/ReportWords`, body)
}

export { getProfileByToken, updateUserByToken, getReports };

