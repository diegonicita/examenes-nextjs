'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import Consults from '@/app/(pages)/consults/components/consults'
import { RowDataPacket } from 'mysql2'
import { ConsultType } from '@/app/models/Consult'

export default async function DisplayConsults({
  deleteAction,
}: {
  deleteAction: (
    prevState: ConsultType,
    formData: FormData,
  ) => Promise<{ message: string } | undefined>
}) {
  const result = (await executeQuery(
    'select * from consultas',
    [],
  )) as RowDataPacket
  return <Consults result={result} deleteAction={deleteAction} />
}
