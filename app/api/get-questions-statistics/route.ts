import { NextResponse } from 'next/server'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'

export async function GET(req: Request, res: Response) {
  const questionsStatistics = await getQuestionsStatistics()
  return NextResponse.json(questionsStatistics)
}
