import Footer from '@/components/Footer'
import '../styles/_global.scss'
import { Inter } from 'next/font/google'
import { NavBar } from '@/components'

const inter = Inter({ subsets: ['vietnamese'] })

export const metadata = {
  title: 'Tiếng Anh Tốt',
  description: 'Với bộ sưu tập từ vựng đa dạng, bạn sẽ được tiếp cận với hàng ngàn từ và cụm từ thông qua các bài học được thiết kế một cách cấu trúc và thú vị. Bạn có thể theo dõi tiến độ học tập của mình, luyện tập qua các bài tập tương tác và kiểm tra kiến thức của mình qua các bài kiểm tra đánh giá.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
