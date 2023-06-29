import { WordItem } from "@/model/word"
import WordItemBox from "../WordItemBox"

const ListWord = (props: { words: WordItem[] | undefined }) => {
    const { words } = props
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    words?.map((item, index) => <WordItemBox key={index} index={index} item={item} />)
                }
            </div>
            <div className="text-center bg-[#058505] py-1 rounded-md"><b>Congratulations!</b></div>
        </>
    )
}
export default ListWord