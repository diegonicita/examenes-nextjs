'use server'
import { RowDataPacket } from 'mysql2'
import searchOwnValoration from './searchOwnValoration'
import searchValorationsQuery from './Queries/searchValorationsQuery'

const searchValorations = async (results: RowDataPacket | undefined | null) => {
  const ids = results?.map((r: { id: any }) => r.id)
  try {
    const result = await searchValorationsQuery(ids)
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

export default searchValorations
