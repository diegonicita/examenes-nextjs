/* Components */
import { Providers } from '@/lib/providers'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import './globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body className="block max-w-2xl mx-auto">
          <Nav />
          <section className="min-h-screen bg-base-100 text-base-content border border-gray-200 p-2">
            <main>{props.children}</main>
          </section>
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
