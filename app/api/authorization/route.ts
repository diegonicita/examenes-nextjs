/* Core */
import { NextResponse } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request, res: Response) {
//   noStore()
//   const headersList = headers()
//   const referer = headersList.get('authorization')
//   console.log(referer)
  // revalidatePath('/', 'layout')

  return NextResponse.json("nada")
}
