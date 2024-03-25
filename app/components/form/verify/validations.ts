import { z } from 'zod'

export const checkFullValidation = (formData: FormData) => {
  return z
    .object({
      email: z
        .string()
        .email({ message: 'Correo Electronico Invalido' })
        .min(1, { message: 'No dejes el campo vacio' }),
    })
    .safeParse({
      email: formData.get('email'),
    })
}

export const checkPartialValidation = (
  formData: FormData,
  partial: {
    email?: true | undefined
  },
) => {
  return z
    .object({
      email: z
        .string()
        .email({ message: 'Correo Electronico Invalido' })
        .min(1, { message: 'No dejes el campo vacio' }),
    })
    .partial(partial)
    .safeParse({
      email: partial.email ? undefined : formData.get('email'),
    })
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getErrorsFromResult = (result: any) => {
  let newObject = { email: '', password: '' }
  if (!result.success) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        result.error.issues.forEach((issue: { path: any[]; message: any }) => {
      newObject = {
        ...newObject,
        [issue.path[0]]: issue.message,
      }
    })
  }
  return newObject
}
