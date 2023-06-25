"use client"
import EngliftButton from "@/components/base/EngliftButton"
import HeadingPage from "@/components/base/HeadingPage"
import CatQuestionMark from '../../../public/logo/cat-question-mark.png'
import { useForm } from "react-hook-form";
import { Success } from "@/components/icon";
const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <div className="w-full max-w-[1024px] mx-auto pt-[10px] px-5 md:px-10">
      <HeadingPage title="Đăng ký" />
      <div className="text-center my-5">
        <h3 className="text-xl"><b>Bạn muốn tạo tài khoản bằng cách nào nhỉ?</b></h3>
        <img className="inline-block" src={CatQuestionMark.src} width="200" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-start items-center">
          <b>Tài khoản mạng xã hội?</b>
          <EngliftButton name="Tạo tài khoản với Google" className="mx-auto bg-[#D21919] my-2 min-w-[250px] block" />
          <EngliftButton disabled={true} name="Tạo tài khoản với Facebook" className="mx-auto bg-[#007BFE] my-2 min-w-[250px] block" />
          <EngliftButton disabled={true} name="Tạo tài khoản với Apple" className="mx-auto bg-[#000000] my-2 min-w-[250px] block" />
        </div>
        <div className="lg:hidden"><h2 className="text-center text-xl"><b>Hoặc</b></h2></div>
        <form className="mt-5 lg:mt-0 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <h6>Email:</h6>
            <input className="form-control-web w-[260px] md:w-[300px] lg:md:w-[340px] xl:md:w-[380px]" type="text" placeholder="Nhập email của bạn" />
          </div>
          <div className="mb-3">
            <h6>Mật khẩu:</h6>
            <input className="form-control-web w-[260px] md:w-[300px] lg:md:w-[340px] xl:md:w-[380px]" type="password" placeholder="Nhập mật khẩu" />
          </div>
          <div className="mb-3">
            <h6>Họ tên:</h6>
            <input className="form-control-web w-[260px] md:w-[300px] lg:md:w-[340px] xl:md:w-[380px]" type="text" placeholder="Nhập nhập họ tên của bạn" />
          </div>
          <EngliftButton icon={Success.src} name="Đăng ký" className="mx-auto bg-[#D21919] my-2 block" />
        </form>
      </div>

    </div>
  )
}
export default Register