'use server'
import searchQuestionsQuery from './Queries/searchQuestionsQuery'

export default async function searchQuestions(queries: string[]) {
  try {
    const questions = await searchQuestionsQuery(queries, 10)
    return questions
  } catch (e) {
    console.log(e)
    return null
  }
}
