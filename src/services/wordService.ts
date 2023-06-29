import { WordItem } from "@/model/word";
import apiBase from "./axiosBase";
import { generateRequest } from "@/utils/func";
import { ApiResponse, PaginationData } from "@/model/common";

const searchWordByKey = (content: string): Promise<ApiResponse<PaginationData<WordItem>>> => {
    return apiBase.get(`/Words/Search${generateRequest({ content })}`)
}

const getWordsByLessonId = (lesson_id: string): Promise<ApiResponse<PaginationData<WordItem>>> => {
    return apiBase.get(`/Words/${lesson_id}`)
}

export { searchWordByKey, getWordsByLessonId };

