"use client"
import { staggerContainer, textVariant } from "@/utils/motion"
import Heading from "../base/Heading"
import { motion } from 'framer-motion';

const DescriptionHome = () => {
    return (
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} variants={staggerContainer()} className="w-full max-w-[1024px] mx-auto pt-[60px] px-5 md:px-10">
            <Heading title="Mô tả về Englift" />
            <motion.div variants={textVariant(0.75)}>
                <p className="text-indent mt-2">Englift là một trang web học tiếng Anh đa chức năng, nhằm giúp bạn tăng cường từ vựng, nắm vững ngữ pháp và chuẩn bị cho kỳ thi Toeic. Với một loạt các tính năng hữu ích, chúng tôi cam kết mang đến cho bạn một trải nghiệm học tập đáng nhớ.
                    Kho từ vựng đa dạng trên Englift cho phép bạn khám phá và tìm hiểu các từ mới theo từng cấp độ. Từ điển chuyên sâu và đáng tin cậy giúp bạn tra cứu nhanh chóng và chính xác. Bạn cũng có thể tạo danh sách từ vựng cá nhân và thực hành với các bài tập tương ứng để ghi nhớ từ một cách hiệu quả.</p>
                <p className="text-indent mt-2">Khóa học trên trang web của chúng tôi được thiết kế bởi các giảng viên chuyên nghiệp và có kinh nghiệm. Chúng tôi cung cấp các khóa học từ cơ bản đến nâng cao, giúp bạn xây dựng nền tảng vững chắc và phát triển kỹ năng ngôn ngữ của mình. Khóa học bao gồm các bài giảng, bài tập thực hành và kiểm tra đánh giá để đảm bảo tiến bộ của bạn.
                    Nếu bạn quan tâm đến từ vựng trong các lĩnh vực cụ thể, chúng tôi cung cấp một bộ sưu tập từ vựng theo chủ đề. Từ kinh doanh, du lịch, khoa học đến công nghệ và nhiều lĩnh vực khác, bạn sẽ tìm thấy từ vựng phong phú và các ví dụ cụ thể để sử dụng trong thực tế.
                    Với chức năng thi thử Toeic, bạn có thể đánh giá khả năng hiện tại của mình và làm quen với cấu trúc và nội dung của kỳ thi quan trọng này. Chúng tôi cung cấp bộ đề thi thực tế và đáp án chi tiết để giúp bạn tự tin hơn khi đối mặt với bài kiểm tra chính thức.</p>
                <p className="text-indent mt-2">Englift không chỉ là một trang web học tiếng Anh thông thường, mà còn là một cộng đồng học tập năng động. Bạn có thể kết nối và trao đổi với các thành viên khác, thảo luận về các chủ đề liên quan đến tiếng Anh và chia sẻ kinh nghiệm học tập của mình.</p>
            </motion.div>
        </motion.div>
    )
}

export default DescriptionHome