import { BASE_URL, VERSION1 } from "@/utils/constants";
import axios from "axios";
import { getAccessToken } from "./commonService";
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
    showSwalMessage('Omg, đã xảy ra lỗi', error?.response?.data?.title || messageResponse[error.response?.data?.message], 'error')
    console.log(error);
    let data: ApiResponse<boolean> = {
        statusCode: error.response?.data?.statusCode,
        success: false,
        message: error.response?.data?.message
    }
    return Promise.resolve(data);
});

export default apiBase;