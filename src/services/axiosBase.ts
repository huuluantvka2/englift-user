import { BASE_URL, VERSION1 } from "@/utils/constants";
import axios from "axios";
import { clearAccessToken, getAccessToken } from "./commonService";
import { showSwalMessage } from "@/utils/func";
import { ApiResponse } from "@/model/common";
import messageResponse from '../commons/messageResponse.json'
const apiBase = axios.create({
    baseURL: `${BASE_URL}/${VERSION1}`,
    headers: {
        Authorization: `Bearer ${getAccessToken()}`
    }
});

apiBase.interceptors.response.use(response => {
    return response?.data
}, error => {
    console.log(error)
    if (error.response?.status === 401) {
        alert("Hết hạn đăng nhập, vui lòng đăng nhập lại")
        clearAccessToken()
        window.location.replace('/dang-nhap')
        return
    }
    showSwalMessage('Omg, đã xảy ra lỗi', error?.response?.data?.title || messageResponse[error.response?.data?.message], 'error')
    let data: ApiResponse<boolean> = {
        statusCode: error.response?.data?.statusCode,
        success: false,
        message: error.response?.data?.message
    }
    return Promise.resolve(data);
});

export default apiBase;