'use server'

import { revalidatePath } from 'next/cache'

export const refreshAction = async (formData: FormData) => {
  revalidatePath('/questions')
}
