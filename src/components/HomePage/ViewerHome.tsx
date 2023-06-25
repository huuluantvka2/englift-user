"use client"
import { fadeIn, staggerContainer } from '@/utils/motion';
import { motion } from 'framer-motion';
const viewers: Array<{ text: string, viewer: number }> = [
    { text: 'Lượt tải app', viewer: 0 },
    { text: 'Người dùng mới', viewer: 50 },
    { text: 'Tài khoản hoạt động', viewer: 348 },
    { text: 'Người dùng mỗi tháng', viewer: 289 },
]
const ViewerHome = () => {
    return (
        <div className="w-full max-flex h-[160px] bg-gradient my-10">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} variants={staggerContainer()} className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4">
                {viewers.map((item, index) => (
                    <motion.div variants={fadeIn('up', 'spring', (index + 1) * 0.5, 0.3, 50)} key={index} className="flex h-[40px] md:h-[160px] justify-center items-center text-xl"><b className='mr-2'>{item.viewer}</b> {item.text}</motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default ViewerHome