"use client"

import WordItemBox from "@/components/WordItemBox"
import EngliftButton from "@/components/base/EngliftButton"
import HeadingPage from "@/components/base/HeadingPage"
import Loading from "@/components/base/Loading"
import { AvatarThinking, CryIcon, Search } from "@/components/icon"
import { WordItem } from "@/model/word"
import { searchWordByKey } from "@/services/wordService"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const SearchWord = (props: { searchParams: { search: string } }) => {
  const { search } = props.searchParams

  //#region useState
  const router = useRouter()
  const [searchContent, setSearchContent] = useState<string>(search)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [words, setWords] = useState<WordItem[] | undefined>(undefined)

  useEffect(() => {
    if (search && searchContent) loadData()
    else setWords([])
  }, [search])

  const loadData = async () => {
    setLoading(true)
    const response = await searchWordByKey(searchContent)
    if (response.success) {
      setWords(response.data?.items)
    }
    console.log(words)
    setLoading(false)
  }
  //#endregion useState

  //#region handle action
  const handleSearch = () => {
    router.replace(`/tu-dien-anh-viet?search=${searchContent}`)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      router.replace(`/tu-dien-anh-viet?search=${searchContent}`)
    }
  }
  //#endregion
  return (
    <div className="w-full max-w-[1024px] mx-auto pt-[10px] px-5 md:px-10">
      <HeadingPage title="Từ điển Anh - Việt" />
      <div className="flex justify-center flex-col items-center md:flex-row">
        <input onKeyDown={handleEnter} onChange={e => setSearchContent(e.target.value)} value={searchContent} className="form-control-web mt-3 w-[240px] md:w-[320px] lg:w[400px]" id="search-word" type="text" aria-label="Search" placeholder="Nhập từ cần tra" />
        <EngliftButton onClick={handleSearch} type="button" icon={Search.src} widthIcon="30" name="Tra từ" className="btn-submit mt-3 mx-2" />
      </div>
      {!search && <div className="min-h-[200px] flex flex-col justify-center items-center mt-5">
        <img width={200} src={AvatarThinking.src} />
        <p>Vui lòng nhập từ tiếng Anh cần tra cứu!</p>
      </div>}
      {search && !isLoading && words?.length === 0 && <div className="min-h-[200px] flex flex-col justify-center items-center mt-5">
        <img width={200} src={CryIcon.src} />
        <p>Rất tiếc chúng tôi không thể tìm thấy từ bạn cần tra cứu</p>
      </div>}
      {isLoading ? <Loading /> : (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="grid grid-cols-1">
            {
              words?.map((item, index) => (index % 2 === 0 ? <WordItemBox item={item} key={index} index={index} /> : ""))
            }
          </div>
          <div className="grid grid-cols-1">
            {
              words?.map((item, index) => (index % 2 !== 0 ? <WordItemBox item={item} key={index} index={index} /> : ""))
            }
          </div>
        </div>
      )}
    </div>
  )
}
export default SearchWord