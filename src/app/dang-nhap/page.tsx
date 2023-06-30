"use client"
import EngliftButton from "@/components/base/EngliftButton";
import HeadingPage from "@/components/base/HeadingPage";
import Loading from "@/components/base/Loading";
import { Success } from "@/components/icon";
import firebase_app from "@/firebase/config";
import { SignIn, UserLocal } from "@/model/user";
import { loginSocial, signInSystem, signUpSystem } from "@/services/authService";
import { setAccessToken, setProfileLocal } from "@/services/commonService";
import { showSwalSuccessMessage } from "@/utils/func";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import CatQuestionMark from '../../../public/logo/cat-question-mark.png';
import Link from "next/link";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth(firebase_app);
auth.languageCode = "vn"

const registerOptions = {
  email: { required: "Vui lòng điền trường thông tin này", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Sai định dạng email' } },
  password: { required: "Vui lòng điền trường thông tin này", minLength: { value: 6, message: 'Ít nhất 6 ký tự' } },
}
const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignIn>();
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
          window.location.replace('/')
        }
      }).catch((error) => {
        console.log(error)
      });
  }
  const handleLoginFacebook = async () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result)
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
      })
      .catch((error) => {
        console.log(error)
      });
  }
  const handleSignIn = async (values: SignIn) => {
    setLoading(true)
    const response = await signInSystem(values)
    if (response.success) {
      setAccessToken(response.data?.accessToken as string)
      let data: UserLocal = {
        id: response.data?.userId as string,
        fullName: response.data?.fullName as string,
        email: response.data?.email as string,
        avatar: response.data?.avatar
      }
      setProfileLocal(data)
      showSwalSuccessMessage('Đăng nhập thành công')
      setTimeout(() => {
        window.location.replace('/')
      }, 1500)
    }
    setLoading(false)
  }
  //#endregion
  return (
    <div className="w-full max-w-[1024px] mx-auto pt-[10px] px-5 md:px-10">
      <HeadingPage title="Đăng nhập" />
      {isLoading ? <Loading /> : (
        <>
          <div className="text-center my-5">
            <h3 className="text-xl"><b>Đăng nhập tài khoản học Englift</b></h3>
            <img className="inline-block" src={CatQuestionMark.src} width="200" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-start items-center">
              <b>Tài khoản mạng xã hội?</b>
              <EngliftButton onClick={handleLoginGoogle} name="Đăng nhập với Google" className="mx-auto bg-[#D21919] my-2 min-w-[250px] block" />
              <EngliftButton disabled name="Đăng nhập với Facebook" className="mx-auto bg-[#007BFE] my-2 min-w-[250px] block" />
              <EngliftButton disabled={true} name="Đăng nhập với Apple" className="mx-auto bg-[#000000] my-2 min-w-[250px] block" />
            </div>
            <div className="lg:hidden"><h2 className="text-center text-xl"><b>Hoặc</b></h2></div>
            <form className="mt-5 lg:mt-0 flex flex-col justify-center items-center" onSubmit={handleSubmit(handleSignIn)}>
              <div className="pb-6 relative">
                <h6>Email:</h6>
                <input {...register('email', registerOptions.email)} type="email" className="form-control-web w-[260px] md:w-[300px] lg:md:w-[340px] xl:md:w-[380px]" placeholder="Nhập email của bạn" />
                <small className="text-dander absolute bottom-0 left-0">
                  {errors?.email && errors?.email?.message}
                </small>
              </div>
              <div className="pb-6 relative">
                <h6>Mật khẩu:</h6>
                <input {...register('password', registerOptions.password)} className="form-control-web w-[260px] md:w-[300px] lg:md:w-[340px] xl:md:w-[380px]" type="password" placeholder="Nhập mật khẩu" />
                <small className="text-dander absolute bottom-0 left-0">
                  {errors?.password && errors?.password?.message}
                </small>
              </div>
              <EngliftButton type="submit" icon={Success.src} name="Đăng nhập" className="mx-auto bg-[#D21919] my-2 block" />
              <div className="mt-3">Chưa có tài khoản? <Link className="italic underline text-[#a865e1]" href="/dang-ky"><b>Tạo ngay tài khoản học</b></Link></div>
            </form>
          </div>
        </>
      )}

    </div>
  )
}
export default SignIn