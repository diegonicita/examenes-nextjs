'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'
import { z } from 'zod'

const schema = z.object({
  id: z.number(),
  correcta: z.number(),
  clasifica1: z.number(),
  clasifica2: z.number(),
  clasifica3: z.number(),
  clasifica4: z.number(),
  clasifica5: z.number(),
})

export default async function updateQuestion(formData: FormData) {
  const validateFields = schema.safeParse({
    id: Number(formData.get('id')),
    correcta: Number(formData.get('correcta')),
    clasifica1: Number(formData.get('clasifica1')),
    clasifica2: Number(formData.get('clasifica2')),
    clasifica3: Number(formData.get('clasifica3')),
    clasifica4: Number(formData.get('clasifica4')),
    clasifica5: Number(formData.get('clasifica5')),
  })
  if (!validateFields.success) {
    return {
      isError: true,
      message: validateFields.error.flatten().fieldErrors,
    }
  }
  try {
    const result = (await executeQuery(
      'UPDATE preguntas SET correcta = ?, clasifica1 = ?, clasifica2 =?, clasifica3 = ?, clasifica4 = ?, clasifica5 = ? WHERE id = ?;',
      [
        validateFields.data.correcta,
        validateFields.data.clasifica1,
        validateFields.data.clasifica2,
        validateFields.data.clasifica3,
        validateFields.data.clasifica4,
        validateFields.data.clasifica5,
        validateFields.data.id,
      ],
    )) as RowDataPacket

    if (result && result.affectedRows > 0) {
      return { isError: false, message: 'success' }
    } else {
      return { isError: true, message: 'error updating question' }
    }
  } catch (e) {
    console.log('error', e)
    return { isError: true, message: 'error updating question' }
  }
}
