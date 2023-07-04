'use client'
import HeadingPage from "@/components/base/HeadingPage"
import Loading from "@/components/base/Loading"
import { Education1, Education2, Education3, Education4 } from "@/components/icon"
import { ReportWords } from "@/model/user"
import { getReports } from "@/services/userService"
import { chartColumnOption } from "@/utils/chart"
import { formatDayMonth, renderLocalDate } from "@/utils/func"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

const Post = () => {
  const [reports, setReports] = useState<ReportWords | undefined>(undefined)
  const [daysReports, setDaysReport] = useState<number>(7)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    loadData()
  }, [daysReports])

  const loadData = async () => {
    setLoading(true)
    const res = await getReports({ days: daysReports, offsetTime: new Date().getTimezoneOffset() })
    setLoading(false)
    if (res.success) {
      setReports(res.data)
    }
  }
  return (
    <div className="w-full max-w-[1200px] mx-auto pt-[10px] px-5 md:px-10">
      <HeadingPage title="Thành tích học tập" />
      {loading ? <Loading /> : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="item-box-5 w-full flex justify-between items-center border-l-[#76bb0c]">
              <div className="left">
                <h4 className="text-xl color-green"><b>Bài học đã học</b></h4>
                <h5 className="text-lg"><b>{reports?.totalLessons}</b></h5>
              </div>
              <div className="right">
                <img className="inline badge-green py-2 px-2 rounded-md" width="60" src={Education1.src} />
              </div>
            </div>

            <div className="item-box-5 w-full flex justify-between items-center border-l-[#2778c4]">
              <div className="left">
                <h4 className="text-xl color-blue"><b>Từ vựng đã học</b></h4>
                <h5 className="text-lg"><b>{reports?.totalWords}</b></h5>
              </div>
              <div className="right">
                <img className="inline badge-blue py-2 px-2 rounded-md" width="60" src={Education2.src} />
              </div>
            </div>

            <div className="item-box-5 w-full flex justify-between items-center border-l-[#a865e1]">
              <div className="left">
                <h4 className="text-xl color-purple"><b>Ngày bắt đầu</b></h4>
                <h5 className="text-lg"><b>{renderLocalDate(reports?.createdAt as string)}</b></h5>
              </div>
              <div className="right">
                <img className="inline badge-purple py-2 px-2 rounded-md" width="60" src={Education3.src} />
              </div>
            </div>

            <div className="item-box-5 w-full flex justify-between items-center border-l-[#c42733]">
              <div className="left">
                <h4 className="text-xl color-red"><b>Ngày học gần nhất</b></h4>
                <h5 className="text-lg"><b>{reports?.lastTimeStudy ? renderLocalDate(reports?.createdAt as string) : ''}</b></h5>
              </div>
              <div className="right">
                <img className="inline badge-red py-2 px-2 rounded-md" width="60" src={Education4.src} />
              </div>
            </div>
          </div>
          <div className="bg-[#ffffff] mt-4 rounded-md">
            <div className="py-2 px-2 text-black"><i className="mr-2">Xem kết quả</i>
              <select defaultValue={daysReports} onChange={(e => setDaysReport(+e.target.value))} id="reportTime" className="w-[150px] h-[36px] form-control-web-4">
                <option value={7}>Trong 7 ngày</option>
                <option value={30}>Trong 30 ngày</option>
              </select>
            </div>
            {reports?.categories.length && (<ReactApexChart width="100%" options={chartColumnOption((formatDayMonth(reports?.categories as string[])))} series={[{ name: 'Số từ', data: reports?.datas as number[] }]} type="bar" height={350} />)}
            <h2 className="text-lg mt-2 color-green text-center"><b>Kết quả học từ vựng {reports?.categories[0]} - {reports?.categories[reports?.categories.length - 1]}</b></h2>
          </div>
        </>
      )}
    </div>
  )
}
export default Post