/* Components */
import { Providers } from '@/lib/providers'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import './globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body className="block">
          <Nav />
          <section className="min-h-screen bg-base-100 text-base-content">
            <main>{props.children}</main>
          </section>
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
