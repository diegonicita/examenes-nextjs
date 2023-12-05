import DisplayConsults from '@/app/server-actions/consults/displayConsults'

const Page = async () => {
  return (
    <>
      <DisplayConsults />
    </>
  )
}

export const metadata = {
  title: 'Productos Server',
}

export default Page