'use server'
import getExamQuery from '../queries/getExamQuery'

export default async function getExam(
  examId: number,
  year: number,
  limit: number,
  page: number,
) {
  try {
    const questions = await getExamQuery(examId, year, limit, page)
    return questions
  } catch (e) {
    throw e
  }
}
