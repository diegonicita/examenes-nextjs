'use server'
import searchQuestionsQuery from './Queries/searchQuestionsQuery'

export default async function searchQuestions(queries: string[],page:number) {
  try {
    const questions = await searchQuestionsQuery(queries, 10,page)
    return questions
  } catch (e) {
    console.log(e)
    return null
  }
}
