'use client'
import KorealiftButton from "@/components/base/EngliftButton"
import HeadingPage from "@/components/base/HeadingPage"
import Loading from "@/components/base/Loading"
import { Avatar, AvatarGirl, SaveIcon, UserHeart, UserSquare } from "@/components/icon"
import { UserItem, UserUpdate } from "@/model/user"
import { getProfileByToken, updateUserByToken } from "@/services/userService"
import { timeNotification } from "@/utils/common"
import { showSwalMessage, showSwalModal } from "@/utils/func"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
const registerOptions = {
  fullName: { required: "Không thể bỏ trống" },
  phoneNumber: { pattern: { value: /^\+?[0-9]{3}-?[0-9]{6,12}$/i, message: 'SĐT không hợp lệ' } },
}

const InformationUser = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UserUpdate>();

  //#region useState
  const [loading, setLoading] = useState<{ getData: boolean, updateDate: boolean }>({ getData: false, updateDate: false })
  const [user, setUser] = useState<UserItem | undefined>(undefined)
  //#endregion
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(prev => ({ ...prev, getData: true }))
    const user = await getProfileByToken()
    console.log('user', user)
    if (user.success) {
      setUser(user.data)
      reset({
        fullName: user.data?.fullName,
        address: user.data?.address,
        introduce: user.data?.introduce || 'Mình rất ham học tiếng anh và để học từ vựng mình vào đây học hỏi được rất nhiều',
        isNotify: user.data?.isNotify,
        phoneNumber: user.data?.phoneNumber,
        refCode: user.data?.refCode,
        timeRemind: user.data?.timeRemind,
        gender: user.data?.gender
      })
    }
    setLoading(prev => ({ ...prev, getData: false }))
  }
  //#region action
  const handleUpdateUser = (values: UserUpdate) => {
    if (values.timeRemind === "Không thông báo") {
      values.isNotify = false
      delete values.timeRemind
    }
    else {
      values.isNotify = true
      values.timeRemind = +(values.timeRemind as string)
    }
    showSwalModal('Cập nhật thông tin', 'Bạn có chắc muốn cập nhật thông tin này không?', 'question').then(async res => {
      if (res.isConfirmed) {
        setLoading(prev => ({ ...prev, updateDate: true }))
        const res = await updateUserByToken(values)
        if (res.success) {
          showSwalMessage('Cập nhật thành công', '', 'success')
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }
      }
    })
  }

  //#endregion
  return (
    <div className="w-full max-w-[1200px] mx-auto pt-[10px] px-5 md:px-10">
      <HeadingPage title="Trang cá nhân" />
      {(loading.getData || loading.updateDate) ? <Loading /> : (
        <div className="container flex justify-between flex-col lg:flex-row">
          <div className="left-info w-[100%] min-h-[380px] lg:w-[68%] rounded-md mt-2">
            <div className="left-info-header px-3 py-2">
              <div className="inline image"><img className="inline" src={UserHeart.src} width="20" /></div>
              <h3 className="inline ml-2 text-lg"><b>Thông tin</b></h3>
            </div>
            <hr className="border-[#80808052]" />
            <div className="left-info-content px-3 py-2">
              <form onSubmit={handleSubmit(handleUpdateUser)}>
                <div className="flex justify-between flex-col lg:flex-row mb-3">
                  <div className="w-[100%] lg:w-[32%] mt-2 relative">
                    <h6 className="require">Họ tên</h6>
                    <input {...register('fullName', registerOptions.fullName)} type="text" className="form-control-web-4 w-[100%] h-[36px]" placeholder="Tên đầy đủ" />
                    <small className="text-dander absolute bottom-[-24px] left-0">
                      {errors?.fullName && errors?.fullName?.message}
                    </small>
                  </div>
                  <div className="w-[100%] lg:w-[66%] mt-2">
                    <h6>Địa chỉ</h6>
                    <input {...register('address')} type="text" className="form-control-web-4 w-[100%] h-[36px]" placeholder="Địa chỉ nhà" />
                  </div>
                </div>

                <div className="flex justify-between flex-col lg:flex-row mb-3">
                  <div className="w-[100%] lg:w-[32%] mt-2 relative">
                    <h6>Số điện thoại</h6>
                    <input type="text" {...register('phoneNumber', registerOptions.phoneNumber)} className="form-control-web-4 w-[100%] h-[36px]" placeholder="Số điện thoại" />
                    <small className="text-dander absolute bottom-[-24px] left-0">
                      {errors?.phoneNumber && errors?.phoneNumber?.message}
                    </small>
                  </div>
                  <div className="w-[100%] lg:w-[32%] mt-2 relative">
                    <h6>Mã giới thiệu</h6>
                    <input {...register('refCode')} type="text" className="form-control-web-4 w-[100%] h-[36px]" placeholder="Mã giới thiệu" />
                  </div>
                  <div className="w-[100%] lg:w-[32%] mt-2 relative">
                    <h6>Giới tính</h6>
                    <div className="flex justify-start">
                      <div className="mr-2">
                        <input id="default-radio-1" defaultChecked={user?.gender == true} onChange={(e) => setValue('gender', true)} type="radio" name="default-radio" className="mr-2" />
                        <span>Nam</span>
                      </div>
                      <div>
                        <input id="default-radio-1" defaultChecked={user?.gender == false} type="radio" onChange={(e) => setValue('gender', false)} name="default-radio" className="mr-2" />
                        <span>Nữ</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between flex-col lg:flex-row mb-3">
                  <div className="w-[100%] lg:w-[32%] mt-2 relative">
                    <h6 className="require">Email</h6>
                    <input value={user?.email} disabled type="email" className="form-control-web-4 w-[100%] h-[36px] disabled" placeholder="Email" />
                  </div>

                  <div className="w-[100%] lg:w-[32%] mt-2 relative">
                    <h6>Thời gian thông báo</h6>
                    <select {...register('timeRemind')} defaultValue={user?.timeRemind || undefined} id="countries" className="w-[100%] h-[36px] form-control-web-4">
                      {timeNotification.map((item, index) => (<option key={index} value={item}>{item !== undefined ? `Lúc ${item}h mỗi ngày` : 'Không thông báo'}</option>))}
                    </select>
                  </div>
                  <div className="w-[100%] lg:w-[32%] mt-2 relative">

                  </div>
                </div>
                <div className="flex justify-between flex-col lg:flex-row mb-3">
                  <div className="w-[100%] mt-2 relative">
                    <h6>Giới thiệu bản thân</h6>
                    <textarea {...register('introduce')} rows={3} className="form-control-web-4 w-full" />
                  </div>
                </div>
                <KorealiftButton type="submit" icon={SaveIcon.src} name="Lưu" className="mx-auto badge-green text-[#ffffff] my-2 block" />
              </form>
            </div>
          </div>
          <div className="right-info w-[100%] h-[100%] lg:w-[30%] mt-2 min-h-[380px] rounded-md">
            <div className="right-info-header px-3 py-2">
              <div className="inline image"><img className="inline" src={UserSquare.src} width="20" /></div>
              <h3 className="inline ml-2 text-lg"><b>Ảnh đại diện</b></h3>
            </div>
            <hr className="border-[#80808052]" />
            <div className="avatar">
              <img className="inline mt-2" width="90%" src={user?.avatar || (user?.gender == true ? Avatar.src : AvatarGirl.src)} />
            </div>
          </div>
        </div >
      )}
    </div >
  )
}
export default InformationUser