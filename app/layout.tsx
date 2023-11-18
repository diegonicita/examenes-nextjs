/* Components */
import { Providers } from '@/lib/providers'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import './globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section className="block max-w-2xl mx-auto">
            <div className="flex justify-center gap-4">
              <Nav />
            </div>
            <header>
              <img
                src="/logo.svg"
                alt="logo"
                width={0}
                height={0}
                sizes={'100vw'}
                className="w-20 h-20 mx-auto"
              />
            </header>

            <main>{props.children}</main>

            <Footer />
          </section>
        </body>
      </html>
    </Providers>
  )
}
