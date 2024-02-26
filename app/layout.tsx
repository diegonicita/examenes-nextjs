/* Components */
import { Providers } from '@/app/lib/providers'
import { Nav } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import './styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider, auth } from '@clerk/nextjs'
import getInfoAuthCookie from './server-actions/helpers/getInfoAuthCookie'

export default async function RootLayout(props: React.PropsWithChildren) {
  const { userId } = auth()
  const payload = await getInfoAuthCookie(userId)

  return (
    <Providers>
      <ClerkProvider>
        <html lang="en">
          <body className="block">
            <Nav logged={payload ? true : false} />
            <Toaster />
            <section className="min-h-screen bg-base-100 text-base-content">
              <main>{props.children}</main>
            </section>
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </Providers>
  )
}
