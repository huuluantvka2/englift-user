"use client"
import EngliftButton from "@/components/base/EngliftButton"
import HeadingPage from "@/components/base/HeadingPage"
import Loading from "@/components/base/Loading"
import { CryIcon, NoCourse1, NoCourse2, Search, Viewer } from "@/components/icon"
import { BaseRequest } from "@/model/common"
import { CourseItem } from "@/model/course"
import { getCourses } from "@/services/courseService"
import { randomImage } from "@/utils/images"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
const Courses = () => {
	//#region useState
	const [request, setRequest] = useState<BaseRequest>({
		limit: 15,
		page: 1,
		search: "",
		sort: undefined
	})
	const [isLoading, setLoading] = useState<boolean>(false)
	const [search, setSearch] = useState<string | undefined>(undefined)
	const [total, setTotal] = useState<number>(0)
	const [courses, setCourses] = useState<CourseItem[] | undefined>(undefined)

	useEffect(() => {
		loadData()
	}, [request.page, request.search])

	const loadData = async () => {
		setLoading(true)
		const response = await getCourses(request)
		if (response.success) {
			response.data?.items.forEach(x => { !x.image && (x.image = randomImage()) })
			setCourses(response.data?.items)
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
	//#endregion

	return (
		<div className="w-full max-w-[1200px] mx-auto pt-[10px] px-5 md:px-10">
			<HeadingPage title="Danh sách khóa học" />
			<div>Tổng hợp các khóa học tiếng Anh theo chủ đề kết hợp với âm thanh, hình ảnh, mẫu câu ví dụ. Tổng hợp từ nhiều nguồn trên Internet và được chia sẻ hoàn toàn miễn phí tại Englift.</div>
			<div className="flex justify-center flex-col items-center md:flex-row">
				<input onKeyDown={handleEnter} value={search} onChange={(e) => setSearch(e.target.value)} className="form-control-web mt-3 w-[240px] md:w-[320px] lg:w[400px]" id="search-word" type="text" aria-label="Search" placeholder="Tìm tên khóa học" />
				<EngliftButton onClick={handleSearch} type="button" icon={Search.src} widthIcon="30" name="Tìm khóa học" className="btn-submit mt-3 mx-2" />
			</div>
			{search != undefined && !isLoading && courses?.length === 0 && <div className="min-h-[200px] flex flex-col justify-center items-center mt-5">
				<img width={200} src={CryIcon.src} />
				<p>Rất tiếc chúng tôi không có khóa học này</p>
			</div>}
			{isLoading ? <Loading /> : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{
							courses?.map((item, index) => (
								<div className="item-box-3 mt-10 relative" key={index}>
									<Link href={`/khoa-hoc/${item.id}`}>
										<img className="hover-image my-2 h-[200px] w-[90%] absolute top-[-30px] rounded-md left-1/2 transform -translate-x-1/2" src={item.image} />
										<h2 className="text-center text-xl md:text-2xl mt-[180px] color-purple"><b>{item.name}</b></h2>
										<p className="text-indent-sm">
											{item.description}
										</p>
										<hr className="border-t-[2px] my-2" />
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
export default Courses