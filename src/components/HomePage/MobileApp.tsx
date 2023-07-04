
"use client"
import { fadeIn, rotateVariants, staggerContainer } from "@/utils/motion";
import ImagePhone from "../../../public/logo/phone-avt.png"
import Heading from "../base/Heading"
import { Android, Apple } from "../icon"
import { motion } from 'framer-motion';
const MobileApp = () => {
    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} variants={staggerContainer()} className="w-full max-w-[1200px] min-h-[400px] md:min-h-[500px] mx-auto pt-[60px] px-5 md:px-10">
            <Heading title="App Mobile" />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <motion.img variants={rotateVariants('left')} className='w-[70%] md:w-[100%] max-w-[700px]' src={ImagePhone.src} alt="Englift" />
                <motion.div variants={fadeIn('left', 'tween', 0.2, 1, 100)}>
                    <div className="mb-14 text-center">Comming Soon !</div>
                    <div className="btn-default">
                        <a href="#" className="flex justify-between">
                            <img className="mr-2" src={Android.src} width="30" />
                            <div>
                                <sub>Available on</sub>
                                <b className="block">Google Store</b>
                            </div>
                        </a>
                    </div>
                    <div className="btn-default">
                        <a href="#" className="flex justify-between">
                            <img className="mr-2" src={Apple.src} width="30" />
                            <div>
                                <sub>Available on</sub>
                                <b className="block">App Store</b>
                            </div>
                        </a></div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default MobileApp