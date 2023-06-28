import { ApiResponse, BaseRequest, PaginationData } from "@/model/common";
import { CourseItem } from "@/model/course";
import { generateRequest } from "@/utils/func";
import apiBase from "./axiosBase";

const getCourses = (request: BaseRequest): Promise<ApiResponse<PaginationData<CourseItem>>> => {
    return apiBase.get(`/Courses${generateRequest(request)}`)
}
const getCourseById = (id: string): Promise<ApiResponse<CourseItem>> => {
    return apiBase.get(`/Courses/${id}`)
}

export { getCourses, getCourseById };

