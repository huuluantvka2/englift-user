"use client"
import { textContainer, textVariant2 } from '@/utils/motion';
import { motion } from 'framer-motion';
const Heading = (props: { title: string }) => {
    const { title } = props
    return (
        <div className="w-full text-center my-5">
            <motion.h2 variants={textContainer} className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold py-3 heading">
                {Array.from(title).map((char, index) => (
                    <motion.span key={index} variants={textVariant2}>{char}</motion.span>
                ))}
            </motion.h2>
        </div>
    )
}

export default Heading