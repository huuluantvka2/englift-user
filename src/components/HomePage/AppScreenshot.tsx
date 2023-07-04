"use client"
import { fadeIn, staggerContainer } from "@/utils/motion";
import { motion } from 'framer-motion';
import Heading from "../base/Heading";
import Image1 from '../../../public/images/screenshot_1.png'
import Image2 from '../../../public/images/screenshot_2.png'
import Image3 from '../../../public/images/screenshot_3.png'
import Image4 from '../../../public/images/screenshot_4.png'
import Image5 from '../../../public/images/screenshot_5.png'
import Image6 from '../../../public/images/screenshot_6.png'
const listItem: Array<string> = [
    // Image1.src, 
    // Image2.src, 
    // Image3.src, 
    // Image4.src, 
    Image5.src,
    Image6.src
]

const AppScreenshot = () => {
    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25, }} variants={staggerContainer(null, null)} className="w-full max-w-[1200px] min-h-[400px] md:min-h-[500px] mx-auto pt-[100px] px-5 md:px-10">
            <Heading title="Ảnh chụp thực tế" />
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {
                    listItem.map((item, index) => (
                        <motion.img variants={fadeIn('right', 'spring', (index + 1) * 0.5, 0.1, 25)} key={index} className="w-full" src={item} />
                    ))
                }
            </div>
        </motion.div>
    )
}

export default AppScreenshot