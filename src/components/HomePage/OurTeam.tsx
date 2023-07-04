"use client"
import Heading from "../base/Heading";
import Profile from '../../../public/logo/profile.jpg'
import { motion } from 'framer-motion';
import { staggerContainer, zoomIn } from "@/utils/motion";
const OurTeam = () => {
    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} variants={staggerContainer()} className="w-full max-w-[1200px] mx-auto pt-[60px] px-5 md:px-10">
            <Heading title="Our Team" />
            <motion.div variants={zoomIn(0.5, 0.5)} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <div className="text-center">
                    <img className="inline-block my-3" src={Profile.src} width="150" />
                    <p className="color-pink"><b>Luân Lê</b></p>
                    <span>Fullstack Developer</span>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default OurTeam