import DisplayProducts from '@/server-actions/products/displayProducts'
import CreateProduct from '@/server-actions/products/createProduct'
import DisplayQuestionsStatistics from '@/server-actions/questions/displayQuestionsStatistics'

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
