import DisplayProducts from '@/app/(pages)/products-server/components/displayProducts'
import CreateForm from '@/app/(pages)/products-server/components/createForm'
import DisplayQuestionsStatistics from '@/app/server-actions/questions/displayQuestionsStatistics'

const Page = async () => {
  return (
    <>
      <DisplayProducts />
      <CreateForm />
      <DisplayQuestionsStatistics />
    </>
  )
}

export const metadata = {
  title: 'Productos Server',
}

export default Page
