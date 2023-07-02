"use client"
import { handlePlayMP3, randomList } from "@/utils/func"
import { useEffect, useState } from "react"
import EngliftButton from "../base/EngliftButton"
import ReactApexChart from "../chart/ReactApexChart"
import { CorrectAnswer, LoudSpeaker, Question } from "../icon"
import { optionPieChart, renderWidthChartPie } from "@/utils/chart"
import { IGameListen } from "@/model/word"
import { OptionGame, ResultGame } from "@/model/common"
const CLASS_NAME_SUBMIT = "game-listen-btn-submit"
const GameListen = (props: { wordItems: IGameListen[], handleSaveResult: any, isSaveResult: boolean }) => {
    const { wordItems, handleSaveResult, isSaveResult } = props
    //#region useState
    const [questionActive, setQuestionActive] = useState<number>(0)
    const [submited, setSubmited] = useState<number>(0)
    const [option, setOption] = useState<OptionGame>({ correct: false, wrong: false, isPlayAudio: true, minutes: 0, seconds: 0 })
    const [result, setResult] = useState<ResultGame | undefined>(undefined)
    const [wordItemsListen, setWordItemsListens] = useState<IGameListen[]>(randomList<IGameListen>(wordItems))
    const [currentQuestion, setCurrentQuestion] = useState<IGameListen>(wordItemsListen[0])
    //#region handle event
    useEffect(() => {
        const timer = setInterval(() => {
            setOption(prev => {
                if (prev.seconds >= 59) return { ...prev, seconds: 0, minutes: prev.minutes + 1 }
                else return { ...prev, seconds: prev.seconds + 1 }
            })
        }, 1000)
        if (result) clearInterval(timer)
        return () => {
            clearInterval(timer)
        }
    }, [result])

    useEffect(() => {
        const handleListenEvent = (e) => {
            if (e.key === 'Enter' && !document.getElementById(CLASS_NAME_SUBMIT)?.classList.contains('cursor-not-allowed')) {
                handleSubmitAnswer()
            }
        }
        if (currentQuestion.key_answer !== undefined) {
            document.addEventListener('keydown', handleListenEvent)
        }
        return () => {
            document.removeEventListener('keydown', handleListenEvent)
        }
    }, [currentQuestion.key_answer])

    useEffect(() => {
        document.getElementById('game-write-input')?.focus()
    }, [questionActive])
    //#endregion

    //#endregion 
    //#region handle action
    const handleChangeQuestion = (index: number) => {
        setQuestionActive(index)
        setCurrentQuestion(wordItemsListen[index])
    }

    const showHideHint = (word: IGameListen) => {
        setCurrentQuestion(prev => { return { ...prev, show_hint: !word.show_hint } })
    }

    const handleNextQuestion = (noNext?: boolean) => {
        if (noNext === true) {
            console.log('completed')
            let result: ResultGame = {
                total: wordItemsListen.length,
                correct: wordItemsListen.filter(item => item.is_correct === true).length,
            }
            result.wrong = result.total - result.correct
            setResult(result)
            return
        }
        if (submited < wordItemsListen.length) {
            let index = questionActive
            let loopCount = 0;
            while (true) {
                index++
                if (index >= wordItemsListen.length) {
                    index = -1
                    loopCount++
                } else if (wordItemsListen[index].is_correct === undefined) {
                    setCurrentQuestion(wordItemsListen[index])
                    setQuestionActive(index)
                    if (option.isPlayAudio && wordItemsListen[index].audio) handlePlayMP3(wordItemsListen[index].audio)
                    break;
                }
                if (loopCount === 3) break;
            }
        }
    }
    const handleSubmitAnswer = () => {
        let index = wordItemsListen.findIndex(x => x.id === currentQuestion.id)
        currentQuestion.is_correct = currentQuestion.key_answer?.toString().toLowerCase() === wordItemsListen[index].content.toLowerCase()
        setWordItemsListens(prev => {
            const updatePrev = [...prev]
            updatePrev[index].key_answer = currentQuestion.key_answer
            updatePrev[index].is_correct = currentQuestion.is_correct
            return updatePrev
        })
        currentQuestion.is_correct === true ? setOption(prev => ({ ...prev, correct: true })) : setOption(prev => ({ ...prev, wrong: true }))
        setSubmited(submited + 1)
        setTimeout(() => {
            setOption(prev => ({ ...prev, correct: false, wrong: false }))
            handleNextQuestion(submited + 1 === wordItemsListen.length)
        }, 1000)
    }

    //#endregion
    return (
        <div className="box-game w-[100%] py-3 px-4 min-h-[300px] rounded-md relative">
            <>
                {(option.correct || option.wrong) && (
                    <h2 className={`absolute w-full left-1/2 top-[25%] translate-x-[-50%] text-center h-[70px] flex items-center justify-center ${option.correct ? 'badge-green' : 'badge-red'}`}>
                        <div className="text-xl text-white"><img className="inline mr-2" src={CorrectAnswer.src} width="40" />{option.correct ? 'Bạn đã trả lời đúng!' : 'Bạn đã trả lời sai!'}</div>
                    </h2>
                )}
                <div className="flex justify-between">
                    <span className="badge badge-red">{submited}/{wordItemsListen.length}</span>
                    <span className="color-pink ">{option.minutes < 10 ? `0${option.minutes}` : option.minutes}:{option.seconds < 10 ? `0${option.seconds}` : option.seconds}</span>
                </div>
                <div className="text-center min-h-[30px]">
                    {currentQuestion.audio && <img onClick={() => handlePlayMP3(currentQuestion.audio)} className='cursor-pointer inline mx-2' src={LoudSpeaker.src} width={30} />}
                </div>
                <div className="text-center my-2 bg-[#00800029] p-1 rounded-md">
                    <b className="mr-2 text-[#0069D9] text-xl">Bạn đã nghe từ gì?</b>
                </div>
                <img className="inline-block mr-2 cursor-pointer" onClick={() => showHideHint(currentQuestion)} width={40} src={Question.src} /> {currentQuestion.show_hint && <span>{currentQuestion.hint}</span>}
                <div className="h-[27px]">
                    {((option.correct == false && option.wrong == false) && currentQuestion.is_correct === true) && <div className="text-center"><span className="text-center badge badge-green">Bạn đã trả lời đúng!</span></div>}
                    {(option.correct == false && option.wrong == false) && currentQuestion.is_correct === false && <div className="text-center"><span className="text-center badge badge-red">Bạn đã trả lời sai! Câu trả lời đúng là: <b className="italic">{currentQuestion.content}</b></span></div>}
                </div>
                <div className="w-full text-center my-2">
                    <input id="game-write-input" disabled={currentQuestion.is_correct !== undefined} value={currentQuestion.key_answer || ''} onChange={(e => setCurrentQuestion(prev => ({ ...prev, key_answer: e.target.value })))} className="form-control-web-2 h-[40px] w-[90%] md:w-[80%]" type="text" placeholder="Nhập câu trả lời của bạn" />
                </div>
                <div className="box-game-pagination my-5">
                    <ul className="flex justify-center">
                        {wordItemsListen.map((item, index) => ((<li onClick={() => handleChangeQuestion(index)} className={`${item.is_correct !== undefined ? (item.is_correct === true ? 'correct' : 'wrong') : ''} ${questionActive === index ? 'active' : ''}`} key={index}><button>{index + 1}</button></li>)))}
                    </ul>
                </div>
                <div className="box-game-action flex justify-center items-center">
                    <EngliftButton id_button="game-listen-btn-submit" disabled={!currentQuestion.key_answer || currentQuestion.is_correct !== undefined} onClick={() => handleSubmitAnswer()} className="mx-2 bg-[#087f08] my-2 w-[fit-content] inline text-[#ffffff]" name="Trả lời" />
                    <EngliftButton disabled={submited == wordItemsListen.length - 1} onClick={() => handleNextQuestion()} className="mx-2 bg-[#716d6d] my-2w-[fit-content] inline text-[#ffffff]" name="Bỏ qua" />
                </div>

                {result !== undefined && (
                    <div className="flex flex-col justify-center items-center">
                        <hr className="w-full h-[2px] badge-red my-2" />
                        {
                            +(result.correct / result.total).toFixed(2) >= 0.95 ? (<h5 className="badge badge-blue">{isSaveResult ? 'Kết quả của bạn đã được lưu lại!' : 'Kết quả của bạn đang được lưu lại!'}</h5>) : (<h5 className="badge badge-red">Cố gắng đạt từ 95% câu đúng nhé, đừng bỏ cuộc!</h5>)
                        }
                        <ReactApexChart options={optionPieChart} series={[result.correct, result.wrong]} type="donut" width={renderWidthChartPie(window.innerWidth)} />
                    </div>
                )}
            </>
        </div >
    )
}


export default GameListen