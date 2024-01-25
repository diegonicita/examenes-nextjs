'use server'
import getExamBySubjectQuery from './queries/getExamBySubjectQuery'

export default async function getExamBySubject(
  examId: number,
  subjectId: number,
) {
  try {
    const questions = await getExamBySubjectQuery(examId, subjectId, 1)
    return questions
  } catch (e) {
    console.log(e)
    return null
  }
}
