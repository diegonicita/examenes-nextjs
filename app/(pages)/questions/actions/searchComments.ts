'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import createTree from './createTree'

const searchItems = async (ids: number[]) => {
  let result = [] as any
  let newObject = {} as any
  if (Array.isArray(ids) === false) return result
  for (const id of ids) {
    const queryString = `SELECT * FROM comments WHERE id_question = ?;`
    result[id] = (await executeQuery(queryString, [id])) as RowDataPacket
    newObject[id] = result[id]
  }
  return newObject
}

const searchCommentsQuery = async (ids: number[]) => {
  const res = await searchItems(ids)
  return res
}

const searchComments = async (results: RowDataPacket | undefined | null) => {
  const ids = results?.map((r: { id: any }) => r.id)
  try {
    const data = await searchCommentsQuery(ids)
    let tree = {} as any
    if (data)
      Object.keys(data).map((key: any) => {
        if (data) tree[key] = createTree(data[key], key)
      })
    console.log(data)
    console.log(tree)
    return { data, tree }
  } catch (error) {
    console.log(error)
    return null
  }
}

export default searchComments
