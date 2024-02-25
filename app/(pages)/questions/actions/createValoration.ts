'use server'

import { ConsultType } from '@/app/models/Consult'
import { refreshAction } from '@/app/(pages)/questions/actions/refreshAction'
import type { UserType } from '@/app/models/User'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import createValorationQuery from './Queries/createValorationQuery'
import { auth } from '@clerk/nextjs'

function transformBitsToByte(bit1: boolean, bit2: boolean, bit3: boolean) {
  return ((bit1 ? 1 : 0) << 2) | ((bit2 ? 1 : 0) << 1) | (bit3 ? 1 : 0)
}

export const createValoration = async (
  prevState: ConsultType,
  formData: FormData,
) => {
  const like = formData.get('like') === 'true' ? true : false
  const unlike = formData.get('unlike') === 'true' ? true : false
  const love = formData.get('love') === 'true' ? true : false
  const id = formData.get('id') // Id de la pregunta
  const { userId } = auth()
  const authData = await getInfoAuthCookie(userId)
  console.log(authData)
  if (authData && authData.id && id) {
    let byte = transformBitsToByte(like, unlike, love)
    try {
      const result = await createValorationQuery({
        id,
        userId: authData.id,
        byte,
      })
      const formData2 = new FormData()
      formData.append('auth', 'false')
      refreshAction(formData2)
    } catch (error) {
      console.log(error)
    }
  }
}
