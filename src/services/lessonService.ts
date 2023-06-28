import { ApiResponse, BaseRequest, PaginationData } from "@/model/common";
import { LessonItem } from "@/model/lesson";
import { generateRequest } from "@/utils/func";
import apiBase from "./axiosBase";

const getLessonsByCourseId = (req: { course_id: string, request: BaseRequest }): Promise<ApiResponse<PaginationData<LessonItem>>> => {
    return apiBase.get(`/Lessons/${req.course_id}${generateRequest(req.request)}`)
}

export { getLessonsByCourseId };

