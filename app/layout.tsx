import './globals.css'
import { Montserrat } from 'next/font/google'

import ToastProvider from '@/providers/toastProvider'
import ModalProvider from '@/providers/modalProvider'
import { cn } from "@/lib/utils"
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const monts = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Shop.co',
  description: 'Minimalist unisex clothes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("bg-stone-100", monts.className)}>
        <ToastProvider />
        <ModalProvider />
        <Navbar />
        <div className='flex flex-col'>
          <div className='bg-white'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
