'use server'

import { revalidatePath } from 'next/cache'

export const refreshAction = async () => {
  revalidatePath('/')
  revalidatePath('/consults')
  revalidatePath('/questions')
}
