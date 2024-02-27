'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import Consults from '@/app/(pages)/consults/components/consults'
import { RowDataPacket } from 'mysql2'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export default async function DisplayConsults() {
  const payload = await getInfoAuthCookie()
  let result = null
  const role = payload?.role
  if (role === 'admin') {
    result = (await executeQuery(
      'select * from consultas',
      [],
    )) as RowDataPacket
    return <Consults result={result} />
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="text-xl pb-4">
            No estas autorizado para ver esta pagina. Habla con el
            administrador.
          </div>
        </div>
      </div>
    )
  }
}
