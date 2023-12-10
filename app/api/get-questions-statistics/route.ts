/* Core */
import { NextResponse } from 'next/server'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'
import { unstable_noStore as noStore } from 'next/cache'

const dynamic = 'force-dynamic'

export async function GET(req: Request, res: Response) {
  noStore()  
  const questionsStatistics = await getQuestionsStatistics()

  return NextResponse.json(questionsStatistics)
}
