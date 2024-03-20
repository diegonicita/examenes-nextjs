'use server'
import getExamsTypesQuery from '../queries/getExamsTypesQuery'

export default async function getExamsTypes() {
  try {
    const examsTypes = await getExamsTypesQuery()
    return examsTypes
  } catch (e) {
    throw e    
  }
}
