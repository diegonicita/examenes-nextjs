import DisplayConsults from '@/app/(pages)/consults/displayConsults'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Container from '@/app/components/container/container'
const Page = async () => {
  const auth = await getInfoAuthCookie()

  return (
    <div className="mt-8">
      <Container title="Admin" subtitle="Información solo para Administradores">
        <CheckServerCookie auth={auth}>
          {auth && <DisplayConsults auth={auth} />}
        </CheckServerCookie>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Admin Only',
}

export default Page
