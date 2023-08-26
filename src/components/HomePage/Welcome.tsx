"use client"
import { fadeIn, staggerContainer, textVariant } from '@/utils/motion';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ImagePhone from '../../../public/logo/phone-avt.png';
import { NextBlueArrow } from '../icon';
import Link from 'next/link';
const Welcome = () => {
    const router = useRouter()
    const [search, setSearch] = useState<string>('')
    const gotoSearch = () => {
        if (search.length) router.push(`/tu-dien-anh-viet?search=${search}`)
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter' && search.length) {
            router.push(`/tu-dien-anh-viet?search=${search}`)
        }
    }
    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} variants={staggerContainer()} className="w-full max-w-[1200px] min-h-[400px] md:min-h-[500px] mx-auto mt-[60px] px-5 md:px-10 relative">
            <motion.img variants={fadeIn('left', 'tween', 0.2, 1, 100)} className='w-[70%] md:w-[100%] max-w-[750px] absolute right-[-65px] bottom-[-50px] md:right-[-160px] md:bottom-[-100px]' src={ImagePhone.src} alt="Korealift" />
            <motion.div variants={textVariant(1)} className='my-10'>
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl">KOREAN</h1>
                <h5 className="mt-3">너가 필요한 모든것. 한국어를 배우려면</h5>
            </motion.div>
            <motion.div className='mt-2' variants={textVariant(1.1)}>
                <Link href="/khoa-hoc" className='btn-go flex justify-center'>
                    <span>Học ngay</span>
                    <img className='ml-2 inline-block' src={NextBlueArrow.src} width="30" />
                </Link>
            </motion.div>
            <motion.div className='mt-8' variants={textVariant(1.2)}>
                <input onKeyDown={handleEnter} onChange={e => setSearch(e.target.value)} className="form-control-web mt-3 max-w-[180px] md:max-w-[260px] mr-2" id="search-word" type="text" aria-label="Search" placeholder="Nhập từ cần tra" />
                <button onClick={gotoSearch} className='btn-submit mt-3 ml-0 md:ml-3'>Tra từ</button>
            </motion.div>

        </motion.div>
    )
}
export default Welcome