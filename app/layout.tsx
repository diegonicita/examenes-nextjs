/* Components */
import { Providers } from '@/app/lib/providers'
import { Nav } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import './styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { ClerkLoaded, ClerkLoading, ClerkProvider, auth } from '@clerk/nextjs'
import getInfoAuthCookie from './server-actions/helpers/getInfoAuthCookie'

export default async function RootLayout(props: React.PropsWithChildren) {
  const { userId } = auth()
  const payload = await getInfoAuthCookie(userId)

  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className="block">
            <ClerkLoading>
              <Nav logged={payload ? true : false} />
              <div className="hero-content mx-auto max-w-sm">
                <div className="hero-content mx-auto max-w-sm">
                  <div className="flex justify-stretch items-stretch gap-4">
                    <div className="flex flex-col gap-4 w-64">
                      <div className="skeleton h-64 w-full"></div>
                      <div className="skeleton h-32 w-full"></div>
                      <div className="skeleton h-32 w-full"></div>
                      <div className="skeleton h-32 w-full"></div>
                    </div>
                    <div className="flex flex-col gap-4 w-64">
                      <div className="skeleton h-64 w-full"></div>
                      <div className="skeleton h-32 w-full"></div>
                      <div className="skeleton h-32 w-full"></div>
                      <div className="skeleton h-32 w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <Nav logged={payload ? true : false} />
              <Toaster />
              <section className="min-h-screen bg-base-100 text-base-content">
                <main>{props.children}</main>
              </section>
            </ClerkLoaded>
            <Footer />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  )
}
