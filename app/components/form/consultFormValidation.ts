import { z } from 'zod'

export const checkFullValidation = (formData: FormData) => {
  return z
    .object({
      fullname: z
        .string()
        .min(3, { message: 'Debes ingresar al menos 3 caracteres' }),
      email: z.string().email({ message: 'Correo Electronico Invalido' }),
      consult: z
        .string()
        .min(5, { message: 'Debes ingresar al menos 5 caracteres' }),
    })
    .safeParse({
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      consult: formData.get('consult'),
    })
}

export const checkPartialValidation = (
  formData: FormData,
  partial: {
    fullname?: true | undefined
    email?: true | undefined
    consult?: true | undefined
  },
) => {
  return z
    .object({
      fullname: z
        .string()
        .min(3, { message: 'Debes ingresar al menos 3 caracteres' }),
      email: z.string().email({ message: 'Correo Electronico Invalido' }),
      consult: z
        .string()
        .min(5, { message: 'Debes ingresar al menos 5 caracteres' }),
    })
    .partial(partial)
    .safeParse({
      fullname: partial.fullname ? undefined : formData.get('fullname'),
      email: partial.email ? undefined : formData.get('email'),
      consult: partial.consult ? undefined : formData.get('consult'),
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
