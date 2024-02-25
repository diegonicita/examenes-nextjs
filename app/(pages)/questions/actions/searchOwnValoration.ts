'use server'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import searchOwnValorationQuery from './Queries/searchOwnValorationQuery'
import { auth } from '@clerk/nextjs'

const searchOwnValoration = async (questionId: number) => {
  const { userId } = auth()
  const authData = await getInfoAuthCookie(userId)
  const valorations = {} as any
  let result = undefined
  if (authData && authData.id) {
    try {
      result = await searchOwnValorationQuery({
        questionId,
        userId: authData.id,
      })
      const r = result[0]
      valorations[questionId] = r?.value
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
  return null
}

export default searchOwnValoration
