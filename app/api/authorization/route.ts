/* Core */
import { NextResponse } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'
import { headers } from 'next/headers'

export async function POST(req: Request, res: Response) {
//   noStore()
//   const headersList = headers()
//   const referer = headersList.get('authorization')
//   console.log(referer)

  return NextResponse.json("nada")
}
