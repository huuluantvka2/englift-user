"use client"
import { fadeIn, staggerContainer } from "@/utils/motion";
import Heading from "../base/Heading";
import { Star, LargePerson, LargeWoman } from "../icon";
import { motion } from 'framer-motion';

const stars = Array(5).fill(null);
const members: Array<{ image: string, name: string, link?: string, comment: string }> = [
    { name: 'Luân Lê', comment: 'I love Englift', image: LargePerson.src },
    { name: 'Ly Nguyễn', comment: 'Good Website', image: LargeWoman.src },
]
const NewMember = () => {
    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} variants={staggerContainer()} className="w-full max-w-[1024px] mx-auto pt-[60px] px-5 md:px-10">
            <Heading title="Thành viên mới" />
            <div className="grid grid-cols-1 md:grid-cols-3">
                {
                    members.map((item, index) => (
                        <motion.div key={index} variants={fadeIn('right', 'spring', (index + 1) * 0.2, 0.1, 50)} className="text-center">
                            <span>{item.comment}</span>
                            <div className="mt-3 flex justify-center">
                                {stars.map((_, index) => (
                                    <img key={index} className="mx-1" src={Star.src} width="20" />
                                ))}
                            </div>
                            <img className="inline-block my-3" src={item.image} width="120" />
                            <p>{item.name}</p>
                        </motion.div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default NewMember