import executeQuery from '@/server-actions/mysqldb'
import DisplayProducts from '@/server-actions/displayProducts'
import CreateProduct from '@/server-actions/createProduct'

const Page = async () => {
  const result = await executeQuery('select * from productos', [])
  console.log(JSON.stringify(result))
  return (
    <>
      {result && (
        <>
          <DisplayProducts result={result} />
          <CreateProduct />
        </>
      )}
      {result && result.length === 0 && <p>No hay productos</p>}
      {!result && (
        <div className="w-full p-4 text-center">
          <p className="badge badge-lg p-4 badge-error text-error-content">
            No se pudo establecer una conexion
          </p>
        </div>
      )}
    </>
  )
}

export const metadata = {
  title: 'Productos Server',
}

export default Page
