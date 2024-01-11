/* Core */
import { NextRequest, NextResponse } from 'next/server'
import getQuestions from '@/app/server-actions/questions/get-questions'
import { unstable_noStore as noStore } from 'next/cache'

export async function GET(req: NextRequest, res: NextResponse) {
  noStore()
  const query = req.nextUrl.searchParams.get('query')
  console.log(query)
  const questions = await getQuestions(query)
  console.log(questions)
  return NextResponse.json(questions)
}
