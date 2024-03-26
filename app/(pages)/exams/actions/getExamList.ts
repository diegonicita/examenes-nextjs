'use server'
import getExamsListQuery from '../queries/getExamsListQuery'

export default async function getExamsList(id: string) {
  try {
    const exams = await getExamsListQuery(id)
    return exams
  } catch (e) {}
}
