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
export interface IWordGame {
    gameWrite?: IGameWrite[],
    gameMultipleChoice?: IMultipleChoice[],
    gameListen?: IGameListen[],
    gameCompleteSentence?: IGameCompleteSentence[]

}

export interface IMultipleChoice extends WordItem {
    random_answers: string[],
    key_correct?: number,
    key_answer?: number,
    is_correct?: boolean,
    show_hint?: boolean,
}

export interface IGameWrite extends WordItem {
    hint?: string,
    key_answer?: string,
    is_correct?: boolean,
    show_hint?: boolean,
}
export interface IGameListen extends WordItem {
    hint?: string,
    key_answer?: string,
    is_correct?: boolean,
    show_hint?: boolean,
}
export interface IGameCompleteSentence extends WordItem {
    key_answer: Array<{ id: number, value: string }>,
    key_string?: string,
    paragraphs: string[]
    is_correct?: boolean,
    show_hint?: boolean,
}