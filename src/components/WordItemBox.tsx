import { WordItem } from "@/model/word"
import { handlePlayMP3, renderBadgeClassname, renderBorderClassname } from "@/utils/func"
import { LoudSpeaker, NoImageWord } from "./icon"

const WordItemBox = (props: { item: WordItem, index: number }) => {
    const { item, index } = props
    return (
        <div className={`item-box-2 text-lg ${renderBorderClassname(index)}`}>
            <div className="flex justify-between">
                <div className="item-box-2-info">
                    <b className="mr-2 color-purple text-xl">{item.content}</b>
                    {item.audio && <img onClick={() => handlePlayMP3(item.audio)} className='cursor-pointer inline mx-2' src={LoudSpeaker.src} width={30} />}
                    <span>{item.phonetic[0] === '/' ? item.phonetic : `/${item.phonetic}/`}</span>
                </div>
                <img className="item-box-2-image" src={NoImageWord.src} width={60} />
            </div>
            <p className="my-2">
                {item.position.replaceAll('/', ',').split(',').map((item, index) => (
                    <span key={index} className={`mr-1 badge ${renderBadgeClassname(item)}`}>{item}</span>
                ))}
            </p>
            <p>👉 <span className="">{item.trans}</span></p>
            <p><span className="italic">{item.example}</span></p>
        </div>
    )
}

export default WordItemBox