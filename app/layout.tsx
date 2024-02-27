/* Components */
import { Providers } from '@/app/lib/providers'
import { Nav } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import './styles/globals.css'
import { Toaster } from 'react-hot-toast'
import ProvidersAuth from './providers-auth'
import AppBar from './components/appbar'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body className="block">
          <AppBar />
          <ProvidersAuth>
            <Nav />
            <Toaster />
            <section className="min-h-screen bg-base-100 text-base-content">
              <main>{props.children}</main>
            </section>
            <Footer />
          </ProvidersAuth>
        </body>
      </html>
    </Providers>
  )
}
