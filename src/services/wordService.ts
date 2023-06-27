import { WordItem } from "@/model/word";
import apiBase from "./axiosBase";
import { generateRequest } from "@/utils/func";
import { ApiResponse, PaginationData } from "@/model/common";

const searchWordByKey = (request: { content: string }): Promise<ApiResponse<PaginationData<WordItem>>> => {
    return apiBase.get(`/Words/Search${generateRequest(request)}`)
}

export { searchWordByKey };

