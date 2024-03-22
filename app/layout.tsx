/* Components */
import { Providers } from '@/app/lib/providers'
import { Nav } from './components/navbar/navbar'
import { Footer } from '@/app/components/footer/footer'
import './styles/globals.css'
import { Toaster } from 'react-hot-toast'
import GoogleAdsense from '@/app/components/googleAdsense/googleAdsense'

export default function RootLayout(props: React.PropsWithChildren) {
  const adsenseCode = process.env.GOOGLE_ADSENSE

  return (
    <Providers>
      <html lang="en" data-theme="light">
        <body className="block">
          <Nav />
          <Toaster />
          <section className="min-h-screen bg-base-100 text-base-content">
            <main>{props.children}</main>
          </section>
          <Footer />
          {adsenseCode && <GoogleAdsense pId={adsenseCode} />}
        </body>
      </html>
    </Providers>
  )
}
