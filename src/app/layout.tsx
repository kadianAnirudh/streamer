import Chat from './components/Chat'
import Providers from './components/Providers'
import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stream Chat',
  description: 'Stream AI customer support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        {children}
        <Chat/>
      </body>
      </Providers>
    </html>
  )
}
