'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import Consults from '@/app/(pages)/consults/components/consults'
import { RowDataPacket } from 'mysql2'

export default async function DisplayConsults() {
  const result = (await executeQuery(
    'select * from consultas',
    [],
  )) as RowDataPacket
  return <Consults result={result} />
}
