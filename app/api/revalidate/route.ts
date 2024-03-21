import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest, response: NextResponse) {
  const path = request.nextUrl.searchParams.get('path')
  console.log('path', path)
  if (path) {
    revalidatePath(`/${path}`)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}
