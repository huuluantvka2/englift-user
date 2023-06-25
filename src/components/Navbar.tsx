"use client"
import { motion } from 'framer-motion';
import { useState } from "react";
import LogoImage from '../../public/logo/logo.png'
import { navVariants } from '@/utils/motion';
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.nav initial="hidden" variants={navVariants}
            whileInView="show" className="flex items-center justify-between flex-wrap p-6 bg-navbar">
            <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-32">
                <img width={60} height={'auto'} src={LogoImage.src} />
            </div>
            <div className="block lg:hidden ml-auto">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                >
                    <svg className={`${isOpen ? "hidden" : "block"}`} width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 13.005C20 13.555 19.554 14 19.005 14H10.995C10.7311 14 10.478 13.8952 10.2914 13.7086C10.1048 13.522 10 13.2689 10 13.005C10 12.7411 10.1048 12.488 10.2914 12.3014C10.478 12.1148 10.7311 12.01 10.995 12.01H19.005C19.555 12.01 20 12.455 20 13.005ZM20 7C20 7.55 19.554 7.995 19.005 7.995H0.995C0.731109 7.995 0.478028 7.89017 0.291429 7.70357C0.10483 7.51697 0 7.26389 0 7C0 6.73611 0.10483 6.48303 0.291429 6.29643C0.478028 6.10983 0.731109 6.005 0.995 6.005H19.005C19.555 6.005 20 6.451 20 7ZM19.005 1.99C19.2689 1.99 19.522 1.88517 19.7086 1.69857C19.8952 1.51197 20 1.25889 20 0.995C20 0.731109 19.8952 0.478027 19.7086 0.291429C19.522 0.10483 19.2689 7.86455e-09 19.005 0H6.995C6.86433 -3.89413e-09 6.73495 0.0257364 6.61423 0.0757399C6.49351 0.125743 6.38382 0.199034 6.29143 0.291429C6.19903 0.383823 6.12574 0.493511 6.07574 0.61423C6.02574 0.734949 6 0.864335 6 0.995C6 1.12567 6.02574 1.25505 6.07574 1.37577C6.12574 1.49649 6.19903 1.60618 6.29143 1.69857C6.38382 1.79097 6.49351 1.86426 6.61423 1.91426C6.73495 1.96426 6.86433 1.99 6.995 1.99H19.005Z" fill="white" />
                    </svg>
                    <svg
                        width="20"
                        fill="#ffffff"
                        className={`${isOpen ? "block" : "hidden"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
            </div>
            <div
                className={`w-full block text-lg flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
            >
                <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-hover">
                    Trang chủ
                </a>
                <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-hover">
                    Bài học
                </a>
                <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-hover">
                    Hướng dẫn
                </a>
                <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-hover">
                    Bài viết
                </a>
                <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-hover">
                    Thi thử Toeic
                </a>
                <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-hover">
                    Giới thiệu
                </a>
                <div className={`lg:hidden`}>
                    <div className="btn-default"><a href="#">Đăng nhập</a></div>
                    <div className="btn-default"><a href="#">Đăng ký</a></div>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="btn-default"><a href="#">Đăng nhập</a></div>
                <div className="btn-default"><a href="#">Đăng ký</a></div>
            </div>
        </motion.nav>
    )
}
export default NavBar