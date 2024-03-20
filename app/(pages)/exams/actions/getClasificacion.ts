'use server'
import getClasificacionQuery from '@/app/(pages)/exams/queries/getClasificacionesQuery'

export default async function getClasificacion() {
  try {
    const examsTypes = await getClasificacionQuery()
    return examsTypes
  } catch (e) { }
}
