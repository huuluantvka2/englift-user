"use client"
import { WordItemMultipleChoice } from "@/model/word"
import { handlePlayMP3 } from "@/utils/func"
import { useState } from "react"
import EngliftButton from "../base/EngliftButton"
import { CorrectAnswer, LoudSpeaker, Question, WrongAnswer } from "../icon"

const MultipleChoice = (props: { wordItems: WordItemMultipleChoice[] }) => {
    const { wordItems } = props
    //#region useState
    const [questionActive, setQuestionActive] = useState<number>(0)
    const [submited, setSubmited] = useState<number>(0)
    const [showMessage, setShowMessage] = useState<{ correct: boolean, wrong: boolean }>({ correct: false, wrong: false })
    const [wordItemsChoices, setWordItemsChoices] = useState<WordItemMultipleChoice[]>(wordItems)
    const [currentQuestion, setCurrentQuestion] = useState<WordItemMultipleChoice>(wordItemsChoices[0])
    //#endregion 

    //#region handle action
    const handleChangeQuestion = (index: number) => {
        setQuestionActive(index)
        setCurrentQuestion(wordItemsChoices[index])
    }

    const showHideHint = (word: WordItemMultipleChoice) => {
        setCurrentQuestion(prev => { return { ...prev, show_hint: !word.show_hint } })
    }

    const handleNextQuestion = (noNext?: boolean) => {
        //sẽ phát triển thêm
        if (noNext) {
            console.log('đã đủ')
            return
        }
        if (submited < wordItemsChoices.length) {
            let index = questionActive
            while (true) {
                index++
                if (index >= wordItemsChoices.length) {
                    index = -1
                } else if (wordItemsChoices[index].is_correct === undefined) {
                    setCurrentQuestion(wordItemsChoices[index])
                    setQuestionActive(index)
                    break;
                }
            }
        }
    }

    const handleChooseAnswer = (key) => {
        if (currentQuestion.is_correct === undefined) {
            setCurrentQuestion(prev => ({ ...prev, key_answer: key }))
        }
    }

    const handleSubmitAnswer = () => {
        let index = wordItemsChoices.findIndex(x => x.id === currentQuestion.id)
        currentQuestion.is_correct = currentQuestion.key_answer === currentQuestion.key_correct
        wordItemsChoices[index] = currentQuestion
        setWordItemsChoices(wordItemsChoices)
        currentQuestion.is_correct === true ? setShowMessage(prev => ({ ...prev, correct: true })) : setShowMessage(prev => ({ ...prev, wrong: true }))
        setSubmited(submited + 1)
        setTimeout(() => {
            setShowMessage({ correct: false, wrong: false })
            handleNextQuestion(submited + 1 == wordItemsChoices.length)
        }, 1000)
    }
    //#endregion
    return (
        <div className="box-game w-[100%] py-3 px-4 min-h-[300px] rounded-md relative">
            {showMessage.correct && (
                <h2 className="absolute w-full left-1/2 top-[25%] translate-x-[-50%] text-center h-[70px] bg-[green] flex items-center justify-center">
                    <div className="text-xl text-white"><img className="inline mr-2" src={CorrectAnswer.src} width="40" /> Bạn đã trả lời đúng!</div>
                </h2>
            )}
            {showMessage.wrong && (
                <h2 className="absolute w-full left-1/2 top-[25%] translate-x-[-50%] text-center h-[70px] bg-[red] flex items-center justify-center">
                    <div className="text-xl text-white"><img className="inline mr-2" src={WrongAnswer.src} width="40" /> Bạn đã trả lời sai!</div>
                </h2>
            )}
            <div className="flex justify-between">
                <span className="badge badge-red">{submited}/{wordItems.length}</span>
                <span className="color-pink ">15:00</span>
                <span><input className="mr-2" type="checkbox" />Phát audio</span>
            </div>
            <div className="text-center min-h-[30px]">
                {currentQuestion.audio && <img onClick={() => handlePlayMP3(currentQuestion.audio)} className='cursor-pointer inline mx-2' src={LoudSpeaker.src} width={30} />}
            </div>
            <div className="text-center my-2 bg-[#00800029] p-1 rounded-md">
                <b className="mr-2 text-[#0069D9] text-xl">{currentQuestion.content}</b>
                <span>{currentQuestion.phonetic[0] === '/' ? currentQuestion.phonetic : `/${currentQuestion.phonetic}/`}</span>
            </div>
            <img className="inline-block mr-2 cursor-pointer" onClick={() => showHideHint(currentQuestion)} width={40} src={Question.src} /> {currentQuestion.show_hint && <span>{currentQuestion.example}</span>}
            <h2 className="text-center">Chọn đáp án đúng</h2>
            <div className="box-game-option grid grid-cols-1 md:grid-cols-2 gap-4 my-3 mx-10 md:mx-14 lg:mx-20 xl:mx-24">
                {currentQuestion.random_answers.map((item, index) => (
                    <div onClick={() => handleChooseAnswer(index)} key={index}
                        className={`box-game-option-item 
                        ${(currentQuestion.is_correct === undefined || currentQuestion.is_correct === true) ? (currentQuestion.key_answer === index ? 'choose' : '') : (currentQuestion.is_correct === false ? (currentQuestion.key_answer === index ? 'wrong' : '') : '')} ${(currentQuestion.is_correct === false && currentQuestion.key_correct === index) ? 'choose' : ''}`}>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
            <div className="box-game-pagination my-5">
                <ul className="flex justify-center">
                    {wordItems.map((item, index) => (
                        <li onClick={() => handleChangeQuestion(index)} className={`${item.is_correct !== undefined ? (item.is_correct === true ? 'correct' : 'wrong') : ''} ${questionActive === index && 'active'}`} key={index}><button>{index + 1}</button></li>
                    ))}
                </ul>
            </div>
            <div className="box-game-action flex justify-center items-center">
                <EngliftButton disabled={currentQuestion.key_answer === undefined || currentQuestion.is_correct !== undefined} onClick={() => handleSubmitAnswer()} className="mx-2 bg-[#087f08] my-2 w-[fit-content] inline text-[#ffffff]" name="Trả lời" />
                <EngliftButton disabled={submited == wordItemsChoices.length - 1} onClick={() => handleNextQuestion()} className="mx-2 bg-[#716d6d] my-2w-[fit-content] inline text-[#ffffff]" name="Bỏ qua" />
            </div>
        </div>
    )
}

export default MultipleChoice