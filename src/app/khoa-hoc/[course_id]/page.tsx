"use client"
import EngliftButton from "@/components/base/EngliftButton"
import HeadingPage from "@/components/base/HeadingPage"
import Loading from "@/components/base/Loading"
import { CryIcon, NoCourse1, NoCourse2, Search, Viewer } from "@/components/icon"
import { BaseRequest } from "@/model/common"
import { CourseItem } from "@/model/course"
import { LessonItem } from "@/model/lesson"
import { getAccessToken } from "@/services/commonService"
import { getCourseById } from "@/services/courseService"
import { getLessonsByCourseId } from "@/services/lessonService"
import { showSwalModal } from "@/utils/func"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
const Lessons = (props: { params: { course_id: string } }) => {
	const { course_id } = props.params
	//#region useState
	const router = useRouter()
	const [request, setRequest] = useState<BaseRequest>({
		limit: 15,
		page: 1,
		search: "",
		sort: undefined
	})
	const [isLoading, setLoading] = useState<boolean>(false)
	const [search, setSearch] = useState<string | undefined>(undefined)
	const [total, setTotal] = useState<number>(0)
	const [lessons, setLessons] = useState<LessonItem[] | undefined>(undefined)
	const [course, setCourse] = useState<CourseItem | undefined>(undefined)

	useEffect(() => {
		loadCourse(course_id)
	}, [])

	const loadCourse = async (id) => {
		const response = await getCourseById(id)
		if (response.success) {
			setCourse(response.data)
		}
	}
	useEffect(() => {
		loadData()
	}, [request.page, request.search])

	const loadData = async () => {
		setLoading(true)
		const response = await getLessonsByCourseId({ course_id, request })
		if (response.success) {
			setLessons(response.data?.items)
			setTotal(response.data?.totalRecord as number)
		}
		setLoading(false)
	}
	//#endregion

	//#region handle action
	const handleChangePage = (e) => {
		setRequest(prev => {
			return {
				...prev,
				page: e.selected + 1
			}
		})
	}

	const handleEnter = (e) => {
		if (e.key === 'Enter') setRequest(prev => { return { ...prev, search } })
	}

	const handleSearch = () => {
		setRequest(prev => { return { ...prev, search } })
	}

	const gotoLessonDetail = (id) => {
		const token = getAccessToken()
		if (token) router.push(`/bai-hoc/${id}`)
		else showSwalModal('Vui lòng đăng nhập để lưu kết quả học tập', 'Đăng nhập ngay?', 'warning', 'Đăng nhập').then(res => {
			if (res.isConfirmed) {
				router.push(`/dang-nhap`)
			}
		})
	}
	//#endregion

	return (
		<div className="w-full max-w-[1248px] mx-auto pt-[10px] px-5 md:px-10">
			<HeadingPage title={`${!course?.name ? 'Đang tải...' : `${course?.name} / Danh sách bài học`}`} />
			<div>{course?.description} Chúc bạn học tốt!</div>
			<div className="flex justify-center flex-col items-center md:flex-row">
				<input onKeyDown={handleEnter} value={search} onChange={(e) => setSearch(e.target.value)} className="form-control-web mt-3 w-[240px] md:w-[320px] lg:w[400px]" id="search-word" type="text" aria-label="Search" placeholder="Tìm tên bài học" />
				<EngliftButton onClick={handleSearch} type="button" icon={Search.src} widthIcon="30" name="Tìm bài học" className="btn-submit mt-3 mx-2" />
			</div>
			{search != undefined && !isLoading && lessons?.length === 0 && <div className="min-h-[200px] flex flex-col justify-center items-center mt-5">
				<img width={200} src={CryIcon.src} />
				<p>Rất tiếc chúng tôi không có bài học này</p>
			</div>}
			{isLoading ? <Loading /> : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{
							lessons?.map((item, index) => (
								<div className="item-box-3 mt-10 relative" key={index}>
									<Link href="#" onClick={(e) => { e.preventDefault(); gotoLessonDetail(item.id) }}>
										<img className="hover-image my-2 w-[200px] h-[200px] absolute top-[-30px] rounded-md left-1/2 transform -translate-x-1/2" src={item.image || (index % 2 === 0 ? NoCourse1.src : NoCourse2.src)} />
										<h2 className="text-center text-xl md:text-2xl mt-[180px] color-purple"><b>{item.name}</b></h2>
										<p className="text-indent-sm">
											{item.description}
										</p>
										<div className="flex justify-between">
											<span><img className="inline mr-2" src={Viewer.src} width="20" />0</span>
											<h4 className="text-end italic">Tác giả: Luân Lê</h4>
										</div>
									</Link>
								</div>
							))
						}
					</div>
					<ReactPaginate
						breakLabel="..."
						className="flex justify-center pagination"
						previousClassName=""
						nextClassName=""
						pageClassName=""
						breakClassName=""
						activeClassName="pagination-active"
						disabledClassName="cursor-not-allowed opacity-60"
						nextLabel="Tiếp >"
						onPageChange={handleChangePage}
						pageRangeDisplayed={4}
						pageCount={Math.ceil(total / (request.limit || 15))}
						initialPage={request.page ? (+request.page - 1) : 0}
						previousLabel="< Trước"
						renderOnZeroPageCount={null}
					/>
				</>
			)}
		</div>
	)
}
export default Lessons