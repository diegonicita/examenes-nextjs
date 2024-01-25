'use server'
import getExamQuery from './queries/getExamQuery'

export default async function getExam(examId: number, year: number) {
  try {
    const questions = await getExamQuery(examId, year, 5)
    return questions
  } catch (e) {
    console.log(e)
    return null
  }
}
