"use client"
import GameCompleteSentence from "@/components/WordPage/GameCompleteSentence"
import GameListen from "@/components/WordPage/GameListen"
import MultipleChoice from "@/components/WordPage/GameMutipleChoice"
import GameWrite from "@/components/WordPage/GameWordWrite"
import ListWord from "@/components/WordPage/ListWord"
import HeadingPage from "@/components/base/HeadingPage"
import Loading from "@/components/base/Loading"
import { CryIcon } from "@/components/icon"
import { LessonItem } from "@/model/lesson"
import { IWordGame, WordItem, IGameListen, IGameWrite, IMultipleChoice, IGameCompleteSentence } from "@/model/word"
import { getLessonById, saveHistoryResult } from "@/services/lessonService"
import { getWordsByLessonId } from "@/services/wordService"
import { INavTabsGame, navTabsGame } from "@/utils/common"
import { randomFromZeroToNumber } from "@/utils/func"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const Words = (props: { params: { lesson_id: string }, searchParams: { tab: number } }) => {
	const { lesson_id } = props.params
	const { tab } = props.searchParams
	//#region useState
	const router = useRouter()
	const [isLoading, setLoading] = useState<boolean>(false)
	const [total, setTotal] = useState<number>(0)
	const [words, setWords] = useState<WordItem[] | undefined>(undefined)
	const [lesson, setLesson] = useState<LessonItem | undefined>(undefined)
	const [wordGame, setWordGame] = useState<IWordGame>({ gameCompleteSentence: undefined, gameMultipleChoice: undefined, gameWrite: undefined })
	const [navTabs, setNavTabs] = useState<INavTabsGame[]>(navTabsGame)
	const [tabActive, setTabActive] = useState<number>(+tab || 1)
	const [isSaveResult, setIsSaveResult] = useState<boolean>(false)
	useEffect(() => {
		let tab: INavTabsGame = navTabsGame.find(item => item.key === tabActive) as INavTabsGame
		handleChangeTab(tab)
		loadLesson(lesson_id)
		loadData()
	}, [])

	const loadLesson = async (id) => {
		const response = await getLessonById(id)
		if (response.success) {
			setLesson(response.data)
		}
	}
	const loadData = async () => {
		setLoading(true)
		const response = await getWordsByLessonId(lesson_id)
		if (response.success) {
			setWords(response.data?.items)
			setTotal(response.data?.totalRecord as number)
		} else setWords([])
		setWordGame(prev => ({
			...prev,
			gameMultipleChoice: processDataMultipleChoice(response.data?.items as WordItem[]),
			gameWrite: processDataGameWrite(response.data?.items as WordItem[]),
			// gameListen: processDataGameListen(response.data?.items as WordItem[]),
			gameCompleteSentence: processDataGameCompleteSentence(response.data?.items as WordItem[]),
		}))
		setLoading(false)
	}

	//#endregion

	//#region process Data
	const processDataMultipleChoice = (wordsList: WordItem[]) => {
		const randomList: string[] = wordsList.map(item => item.trans)
		const IMultipleChoices: IMultipleChoice[] = []
		wordsList.forEach(item => {
			const random_answers: string[] = []
			const randomListPerItem = [...randomList.filter(x => x !== item.trans)]
			const key_correct = randomFromZeroToNumber(3)
			for (let i = 0; i <= 3; i++) {
				if (key_correct === i) random_answers.push(item.trans)
				else {
					const index = randomFromZeroToNumber(randomListPerItem.length - 1)
					random_answers.push(randomListPerItem[index])
					randomListPerItem.splice(index, 1)
				}
			}
			IMultipleChoices.push({ ...item, random_answers, key_correct })
		})
		return IMultipleChoices
	}

	const processDataGameWrite = (wordsList: WordItem[]) => {
		const newList: IGameWrite[] = []
		wordsList.forEach((item) => {
			const hintArr = item.example.split(`${item.content}`)
			let hint: string = ''
			if (hintArr.length === 2) {
				hint = hintArr[0] + "_______" + hintArr[1]
			}
			newList.push({ ...item, hint })
		})
		return [...newList]
	}

	const processDataGameListen = (wordsList: WordItem[]) => {
		const newList: IGameListen[] = []
		wordsList.forEach((item) => {
			if (item.audio) {
				const hintArr = item.example.split(`${item.content}`)
				let hint: string = ''
				if (hintArr.length === 2) {
					hint = hintArr[0] + "_______" + hintArr[1]
				}
				newList.push({ ...item, hint })
			}
		})
		return [...newList]
	}

	const processDataGameCompleteSentence = (wordsList: WordItem[]) => {
		const newList: IGameCompleteSentence[] = []
		wordsList.forEach((item) => {
			const paragraphs: string[] = item.example.split(`${item.content}`)
			if (paragraphs.length === 2) {
				newList.push({ ...item, paragraphs })
			}
		})
		return [...newList]
	}

	//#endregion
	//#region handle action
	const handleChangeTab = (item: INavTabsGame) => {
		const newTabs = navTabs.map(x => {
			if (x.key === item.key) {
				x.isActive = true
				setTabActive(x.key)
				router.replace(`/bai-hoc/${lesson_id}?tab=${x.key}`)
			}
			else x.isActive = false
			return x
		})
		setNavTabs(newTabs)
	}

	const handleSaveResult = async () => {
		let res = await saveHistoryResult(lesson_id)
		if (res.success) setIsSaveResult(true)
		console.log('res', res)
	}

	//#endregion

	return (
		<div className="w-full max-w-[1200px] mx-auto pt-[10px] px-5 md:px-10">
			<HeadingPage title={`${!lesson?.name ? 'Đang tải...' : `${lesson?.name} / ${total} Từ vựng`}`} />
			<div className="my-3">{lesson?.description} Chúc bạn học tốt!</div>
			{!isLoading && words?.length === 0 && <div className="min-h-[200px] flex flex-col justify-center items-center mt-5">
				<img width={200} src={CryIcon.src} />
				<p>Rất tiếc chưa có từ cho bài học này</p>
			</div>
			}
			<ul className="nav-tabs flex justify-start items-center py-3 mb-3">
				{navTabs.map(item => (
					<li onClick={(e) => handleChangeTab(item)} key={item.key} className={`nav-tabs-item ${item.isActive && 'active'}`}>
						<button><img className="mr-1" src={item.icon} width="24" /><span className="hidden md:inline">{item.name}</span></button>
					</li>
				))}
			</ul>
			{(isLoading || !words) ? <Loading /> : (
				<>
					{tabActive === 1 && <ListWord words={words} />}
					{tabActive === 2 && wordGame.gameMultipleChoice?.length && <MultipleChoice handleSaveResult={handleSaveResult} isSaveResult={isSaveResult} wordItems={JSON.parse(JSON.stringify(wordGame.gameMultipleChoice))} />}
					{tabActive === 3 && wordGame.gameWrite?.length && <GameWrite handleSaveResult={handleSaveResult} isSaveResult={isSaveResult} wordItems={JSON.parse(JSON.stringify(wordGame.gameWrite))} />}
					{/* {tabActive === 4 && wordGame.gameListen?.length && <GameListen handleSaveResult={handleSaveResult} isSaveResult={isSaveResult} wordItems={JSON.parse(JSON.stringify(wordGame.gameListen))} />} */}
					{tabActive === 5 && wordGame.gameCompleteSentence?.length && <GameCompleteSentence handleSaveResult={handleSaveResult} isSaveResult={isSaveResult} wordItems={JSON.parse(JSON.stringify(wordGame.gameCompleteSentence))} />}
				</>
			)}
		</div>
	)
}
export default Words
