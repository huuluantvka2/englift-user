"use client"
import { fadeIn, staggerContainer } from "@/utils/motion";
import Heading from "../base/Heading"
import { Dictionary, Course, Topic, Exam } from "./../icon"
import { motion } from 'framer-motion';
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

const listItem: Array<{ name: string, link?: string, icon: any }> = [
    { name: 'Kho từ vựng', icon: Dictionary, link: '/tu-dien-anh-viet?search=' },
    { name: 'Khóa học', icon: Course, link: '/khoa-hoc' },
    { name: 'Từ vựng theo chủ đề', icon: Topic, link: '#' },
    { name: 'Thi Toeic', icon: Exam, link: 'https://online.toeicmentors.com' }
]

const FunctionItem = () => {

    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25, }} variants={staggerContainer(null, null)} className="w-full max-w-[1200px] min-h-[400px] md:min-h-[500px] mx-auto pt-[100px] px-5 md:px-10">
            <Heading title="Tính năng chính" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    listItem.map((item, index) => (
                        <motion.div variants={fadeIn('right', 'spring', (index + 1) * 0.5, 0.1, 25)} className="item-box text-lg font-bold cursor-pointer" key={index}>
                            <Link className="flex flex-col items-center" href={item.link as Url}>
                                <img className="my-2" src={item.icon.src} width="40" />
                                <span>{item.name}</span>
                            </Link>
                        </motion.div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default FunctionItem