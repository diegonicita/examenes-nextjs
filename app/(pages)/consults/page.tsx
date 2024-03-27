import DisplayConsults from '@/app/(pages)/consults/displayConsults'
import CheckServerCookie from '@/app/components/checkCookie/checkServerCookie'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import Container from '@/app/components/container/container'
import Chat from '../consults/components/chat/chat'
const Page = async () => {
  const auth = await getInfoAuthCookie()
  const urlChatServer = process.env.URL_CHAT_SERVER

  return (
    <div className="mt-8">
      {urlChatServer && auth && auth.role === 'admin' && (
        <Chat
          urlChatServer={urlChatServer}
          email={auth?.email}
          username={auth?.username}
        />
      )}
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
