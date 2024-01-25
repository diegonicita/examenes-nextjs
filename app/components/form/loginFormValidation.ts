import { z } from 'zod'

export const checkFullValidation = (formData: FormData) => {
  return z
    .object({
      email: z.string().email({ message: 'Correo Electronico Invalido' }),
    })
    .safeParse({
      email: formData.get('email'),
    })
}

export const getErrorsFromResult = (result: any) => {
  let newObject = { fullname: '', email: '', consult: '' }
  if (!result.success) {
    result.error.issues.forEach((issue: { path: any[]; message: any }) => {
      newObject = {
        ...newObject,
        [issue.path[0]]: issue.message,
      }
    })
  }
  return newObject
}
