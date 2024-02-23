'use server'

import { revalidatePath } from 'next/cache'

export const refreshAction = async () => {
  console.log("refresh")
  revalidatePath('/')
  revalidatePath('/consults')
  revalidatePath('/questions')
}
