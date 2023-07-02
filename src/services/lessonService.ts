import { ApiResponse, BaseRequest, PaginationData, SingleId } from "@/model/common";
import { LessonItem } from "@/model/lesson";
import { generateRequest } from "@/utils/func";
import apiBase from "./axiosBase";

const getLessonsByCourseId = (req: { course_id: string, request: BaseRequest }): Promise<ApiResponse<PaginationData<LessonItem>>> => {
    return apiBase.get(`/Lessons/Courses/${req.course_id}${generateRequest(req.request)}`)
}

const getLessonById = (id: string): Promise<ApiResponse<LessonItem>> => {
    return apiBase.get(`/Lessons/${id}`)
}

const saveHistoryResult = (lessonId: string): Promise<ApiResponse<SingleId>> => {
    return apiBase.post(`/Lessons/${lessonId}/History`, {})
}
export { getLessonsByCourseId, getLessonById, saveHistoryResult };

