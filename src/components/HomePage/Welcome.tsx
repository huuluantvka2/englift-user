"use client"
import { fadeIn, staggerContainer, textVariant } from '@/utils/motion';
import ImagePhone from '../../../public/logo/phone-avt.png'
import { motion } from 'framer-motion';
const Welcome = () => {
    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} variants={staggerContainer()} className="w-full max-w-[1024px] min-h-[400px] md:min-h-[500px] mx-auto mt-[60px] px-5 md:px-10 relative">
            <motion.img variants={fadeIn('left', 'tween', 0.2, 1, 100)} className='w-[70%] md:w-[100%] max-w-[700px] absolute right-[-60px] bottom-[10px] md:right-[-160px] md:bottom-[-100px]' src={ImagePhone.src} alt="Englift" />
            <motion.div variants={textVariant(1)} className='my-10'>
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl">ENGLIFT - Tiếng Anh Tốt</h1>
                <h5 className="mt-3">Everything You Need. To Learning English</h5>
            </motion.div>
            <motion.div variants={textVariant(1.1)}>
                <input className="form-control-web mt-3" id="search-word" type="text" aria-label="Search" placeholder="Nhập từ cần tra" />
                <button className='btn-submit mt-3 ml-0 md:ml-3'>Tra từ</button>
            </motion.div>
        </motion.div>
    )
}
export default Welcome