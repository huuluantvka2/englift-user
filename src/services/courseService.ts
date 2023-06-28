import { WordItem } from "@/model/word";
import apiBase from "./axiosBase";
import { generateRequest } from "@/utils/func";
import { ApiResponse, BaseRequest, PaginationData } from "@/model/common";
import { CourseItem } from "@/model/course";

const getCourses = (request: BaseRequest): Promise<ApiResponse<PaginationData<CourseItem>>> => {
    return apiBase.get(`/Courses${generateRequest(request)}`)
}

export { getCourses };

