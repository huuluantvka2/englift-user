export interface WordItem {
    id: string,
    audio?: string,
    content: string,
    trans: string,
    example: string,
    phonetic: string,
    image: string,
    position: string,
}

export interface WordItemMultipleChoice extends WordItem {
    random_answers: string[],
    key_correct?: number,
    key_answer?: number,
    is_correct?: boolean,
    show_hint?: boolean,
}