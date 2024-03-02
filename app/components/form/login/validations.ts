import { z } from 'zod'

export const checkFullValidation = (formData: FormData) => {
  return z
    .object({
      email: z
        .string()
        .email({ message: 'Correo Electronico Invalido' })
        .min(1, { message: 'No dejes el campo vacio' }),
      password: z
        .string()
        .min(7, { message: 'Contraseña muy corta' })
        .min(1, { message: 'No dejes el campo vacio' }),
    })
    .safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
}

export const checkPartialValidation = (
  formData: FormData,
  partial: {
    email?: true | undefined
    password?: true | undefined
  },
) => {
  return z
    .object({
      email: z
        .string()
        .email({ message: 'Correo Electronico Invalido' })
        .min(1, { message: 'No dejes el campo vacio' }),
      password: z
        .string()
        .min(7, { message: 'Contraseña muy corta' })
        .min(1, { message: 'No dejes el campo vacio' }),
    })
    .partial(partial)
    .safeParse({      
      email: partial.email ? undefined : formData.get('email'),
      password: partial.password ? undefined : formData.get('password'),
    })
}

export const getErrorsFromResult = (result: any) => {
  let newObject = { email: '', password: '' }
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
