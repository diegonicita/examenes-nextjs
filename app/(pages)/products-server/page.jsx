import executeQuery from '@/server-actions/mysqldb'
import DisplayProducts from '@/server-actions/displayProducts'
import ModifyProducts from '@/server-actions/modifyProducts'

const Page = async () => {
  const result = await executeQuery('select * from productos', [])
  return (
    <>
      <DisplayProducts result={result} />
      <ModifyProducts />
    </>
  )
}

export const metadata = {
  title: 'Productos Server',
}

export default Page
