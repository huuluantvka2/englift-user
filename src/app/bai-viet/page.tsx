import HeadingPage from "@/components/base/HeadingPage"
import { CryIcon } from "@/components/icon"

const Post = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto pt-[10px] px-5 md:px-10">
      <HeadingPage title="Bài viết" />
      {<div className="min-h-[200px] flex flex-col justify-center items-center mt-5">
        <img width={200} src={CryIcon.src} />
        <p>Rất tiếc chưa có bài viết nào dành cho bạn</p>
      </div>
      }
    </div>
  )
}
export default Post