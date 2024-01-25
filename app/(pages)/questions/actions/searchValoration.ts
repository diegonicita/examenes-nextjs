'use server'
import { RowDataPacket } from 'mysql2'
import searchOwnValoration from './searchOwnValoration'
import searchValorationsQuery from './queries/searchValorationsQuery'

const searchValorations = async (results: RowDataPacket | undefined | null) => {
  const ids = results?.map((r: { id: any }) => r.id)
  console.log(ids)
  try {
    const result = await searchValorationsQuery(ids)
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

export default searchValorations
