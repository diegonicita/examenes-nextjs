import { z } from 'zod'

const registerValidator = z.object({
  username: z.string().min(1, { message: 'No dejes el campo vacio' }),
  email: z
    .string()
    .email({ message: 'Correo Electronico Invalido' })
    .min(1, { message: 'No dejes el campo vacio' }),
  password: z
    .string()
    .min(7, { message: 'Contraseña muy corta' })
    .min(1, { message: 'No dejes el campo vacio' }),
  confirmPassword: z
    .string()
    .min(7, { message: 'Contraseña muy corta' })
    .min(1, { message: 'No dejes el campo vacio' }),
})

export const checkFullValidation = (formData: FormData) => {
  return registerValidator
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
      path: ['confirmPassword'], // path of error
    })
    .safeParse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })
}

export const checkPartialValidation = (
  formData: FormData,
  partial: {
    username?: true | undefined
    email?: true | undefined
    password?: true | undefined
    confirmPassword?: true | undefined
  },
) => {
  return registerValidator.partial(partial).safeParse({
    username: partial.username ? undefined : formData.get('username'),
    email: partial.email ? undefined : formData.get('email'),
    password: partial.password ? undefined : formData.get('password'),
    confirmPassword: partial.confirmPassword
      ? undefined
      : formData.get('confirmPassword'),
  })
}

export const getErrorsFromResult = (result: any) => {
  let newObject = { username: '', email: '', password: '', confirmPassword: '' }
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
