import DisplayProducts from '@/app/server-actions/products/displayProducts'
import CreateProduct from '@/app/server-actions/products/createProduct'
import DisplayQuestionsStatistics from '@/app/server-actions/questions/displayQuestionsStatistics'

const Page = async () => {
  return (
    <>
      <DisplayProducts />
      <CreateProduct />
      <DisplayQuestionsStatistics />
    </>
  )
}

export const metadata = {
  title: 'Productos Server',
}

export default Page
