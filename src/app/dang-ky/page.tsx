"use client"
import EngliftButton from "@/components/base/EngliftButton";
import HeadingPage from "@/components/base/HeadingPage";
import Loading from "@/components/base/Loading";
import { Success } from "@/components/icon";
import firebase_app from "@/firebase/config";
import { SignUp, UserLocal } from "@/model/user";
import { loginSocial, signUpSystem } from "@/services/authService";
import { setAccessToken, setProfileLocal } from "@/services/commonService";
import { showSwalModal, showSwalSuccessMessage } from "@/utils/func";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import CatQuestionMark from '../../../public/logo/cat-question-mark.png';

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);
auth.languageCode = "vn"

const registerOptions = {
  fullName: { required: "Vui lòng điền trường thông tin này", minLength: { value: 6, message: 'Ít nhất 6 ký tự' } },
  email: { required: "Vui lòng điền trường thông tin này", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Sai định dạng email' } },
  password: { required: "Vui lòng điền trường thông tin này", minLength: { value: 6, message: 'Ít nhất 6 ký tự' } },
}
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUp>();
  const router = useRouter()
  //useState
  const [isLoading, setLoading] = useState<boolean>(false)

  //endUseState

  //#region handleAction
  const handleLoginGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result: any) => {
        const accessToken = result.user?.accessToken
        const uid = result.user.uid;
        setLoading(true)
        const response = await loginSocial({ accessToken, uid, typeLogin: 2 })
        setLoading(false)
        if (response.success) {
          setAccessToken(response.data?.accessToken as string)
          let data: UserLocal = {
            id: response.data?.userId as string,
            fullName: result.user?.displayName,
            email: result.user?.email,
            avatar: result.user?.photoURL
          }
          setProfileLocal(data)
          showSwalSuccessMessage('Đăng nhập thành công')
          setTimeout(() => {
            window.location.replace('/')
          }, 1500)
        }
      }).catch((error) => {
        console.log(error)
      });
  }
  const handleLoginFacebook = async () => {
  }
  const handleSignUp = (values: SignUp) => {
    console.log(values)
    showSwalModal('Bạn có chắc muốn tạo tài khoản?', '', 'question').then(async (res) => {
      if (res.isConfirmed) {
        setLoading(true)
        const response = await signUpSystem(values)
        if (response.success) {
          showSwalSuccessMessage('Tạo tài khoản thành công')
          router.push('/dang-nhap')
        }
        setLoading(false)
      }
    })
  }
  //#endregion
  return (
    <div className="w-full max-w-[1200px] mx-auto pt-[10px] px-5 md:px-10">
      <HeadingPage title="Đăng ký" />
      {isLoading ? <Loading /> : (
        <>
          <div className="text-center my-5">
            <h3 className="text-xl"><b>Bạn muốn tạo tài khoản bằng cách nào nhỉ?</b></h3>
            <img className="inline-block" src={CatQuestionMark.src} width="200" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-start items-center">
              <b>Tài khoản mạng xã hội?</b>
              <EngliftButton onClick={handleLoginGoogle} name="Tạo tài khoản với Google" className="mx-auto bg-[#D21919] my-2 min-w-[250px] block" />
              <EngliftButton disabled={true} name="Tạo tài khoản với Facebook" className="mx-auto bg-[#007BFE] my-2 min-w-[250px] block" />
              <EngliftButton disabled={true} name="Tạo tài khoản với Apple" className="mx-auto bg-[#000000] my-2 min-w-[250px] block" />
            </div>
            <div className="lg:hidden"><h2 className="text-center text-xl"><b>Hoặc</b></h2></div>
            <form className="mt-5 lg:mt-0 flex flex-col justify-center items-center" onSubmit={handleSubmit(handleSignUp)}>
              <div className="pb-6 relative">
                <h6 className="require">Email:</h6>
                <input {...register('email', registerOptions.email)} type="email" className="form-control-web w-[260px] md:w-[300px] lg:md:w-[340px] xl:md:w-[380px]" placeholder="Nhập email của bạn" />
                <small className="text-dander absolute bottom-0 left-0">
                  {errors?.email && errors?.email?.message}
                </small>
              </div>
              <div className="pb-6 relative">
                <h6 className="require">Mật khẩu:</h6>
                <input {...register('password', registerOptions.password)} className="form-control-web w-[260px] md:w-[300px] lg:md:w-[340px] xl:md:w-[380px]" type="password" placeholder="Nhập mật khẩu" />
                <small className="text-dander absolute bottom-0 left-0">
                  {errors?.password && errors?.password?.message}
                </small>
              </div>
              <div className="pb-6 relative">
                <h6 className="require">Họ tên:</h6>
                <input {...register('fullName', registerOptions.fullName)} className="form-control-web w-[260px] md:w-[300px] lg:md:w-[340px] xl:md:w-[380px]" type="text" placeholder="Nhập nhập họ tên của bạn" />
                <small className="text-dander absolute bottom-0 left-0">
                  {errors?.fullName && errors?.fullName?.message}
                </small>
              </div>
              <EngliftButton type="submit" icon={Success.src} name="Đăng ký" className="mx-auto bg-[#D21919] my-2 block" />
              <div className="mt-3">Đã có tài khoản? <Link className="italic underline text-[#a865e1]" href="/dang-nhap"><b>Đăng nhập ngay</b></Link></div>
            </form>
          </div>
        </>
      )}

    </div>
  )
}
export default Register