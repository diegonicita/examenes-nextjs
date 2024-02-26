import { auth } from '@clerk/nextjs'
import Home from './(pages)/home/page'
import { Nav } from './components/navbar/navbar'
import getInfoAuthCookie from './server-actions/helpers/getInfoAuthCookie'

export default async function IndexPage() {
  const { userId } = auth()
  const payload = await getInfoAuthCookie(userId)
  return (
    <div>
      <Nav logged={payload ? true : false} />
      <Home />
    </div>
  )
}

export const metadata = {
  title: 'ERM Residencias Médicas',
}
