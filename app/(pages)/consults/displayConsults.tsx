'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import Consults from '@/app/(pages)/consults/components/consults'
import type { RowDataPacket } from 'mysql2'
import type { UserType } from '@/app/models/User'

export default async function DisplayConsults({ auth }: { auth: UserType }) {
  let result = null
  if (auth)
    if (auth.role === 'admin') {
      result = (await executeQuery(
        'select * from consultas',
        [],
      )) as RowDataPacket
      return <Consults result={result} />
    }
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="text-xl pb-4">
          No estas autorizado para ver esta pagina. Habla con el administrador.
        </div>
      </div>
    </div>
  )
}
