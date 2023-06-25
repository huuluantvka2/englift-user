"use client"
import { fadeIn, staggerContainer } from "@/utils/motion";
import Heading from "../base/Heading"
import { Dictionary, Course, Topic, Exam } from "./../icon"
import { motion } from 'framer-motion';

const listItem: Array<{ name: string, link?: string, icon: any }> = [
    { name: 'Kho từ vựng', icon: Dictionary, link: '#' },
    { name: 'Khóa học', icon: Course, link: '#' },
    { name: 'Từ vựng theo chủ đề', icon: Topic, link: '#' },
    { name: 'Thi Toeic', icon: Exam, link: '#' }
]

const FunctionItem = () => {

    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25, }} variants={staggerContainer(null, null)} className="w-full max-w-[1024px] min-h-[400px] md:min-h-[500px] mx-auto pt-[100px] px-5 md:px-10">
            <Heading title="Tính năng chính" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    listItem.map((item, index) => (
                        <motion.div variants={fadeIn('right', 'spring', (index + 1) * 0.5, 0.1, 25)} className="item-box text-lg font-bold" key={index}>
                            <img className="my-2" src={item.icon.src} width="40" />
                            <span>{item.name}</span>
                        </motion.div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default FunctionItem