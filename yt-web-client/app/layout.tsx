import styles from './globals.module.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Navbar from './navbar/navbar'
import NavbarSide from './navbarSide/navbarSide'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: 'YouTube',
  description: 'YouTube web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className={styles.layout}>
    

          <div className={styles.navbar}>
            <Navbar />
          </div>

          <div className={styles.navbarSide}>
            <NavbarSide />
          </div>
          

          <div className={styles.content}>
            {children}
          </div>
        </body>
    </html>
  )
}
