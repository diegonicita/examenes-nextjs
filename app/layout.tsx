/* Components */
import { Providers } from '@/lib/providers'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'

/* Instruments */
import styles from './styles/layout.module.css'
import './styles/globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section className="block max-w-2xl mx-auto">
            <div className="flex justify-center gap-4"><Nav />
            </div>

            <header className={styles.header}>
              <img src="/logo.svg" className={styles.logo} alt="logo" />
            </header>

            <main className={styles.main}>{props.children}</main>

            <Footer />           
          </section>
        </body>
      </html>
    </Providers>
  )
}
