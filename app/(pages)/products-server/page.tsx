import DisplayProducts from '@/app/(pages)/products-server/components/clasificaciones'

const Page = async () => {
  return (
    <div>
      <DisplayProducts />
    </div>
  )
}

export const metadata = {
  title: 'Productos Server',
}

export default Page
