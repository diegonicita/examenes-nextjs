import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import { type NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  let id = searchParams.get('id')
  const payload = (await getInfoAuthCookie()) as unknown as {
    id: number
    role: string
    token: string
  }
  const token = payload?.token
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  if (payload?.role === 'admin' && process.env.URL_PROFILE) {
    if (!id) id = payload.id.toString()
    const respuesta = await fetch(
      `${process.env.URL_PROFILE}/${id}`,
      requestOptions,
    )
    const json = await respuesta.json()
    return NextResponse.json(json)
  }

  if (payload?.role === 'user-1' && process.env.URL_PROFILE && payload?.id) {
    const respuesta = await fetch(
      `${process.env.URL_PROFILE}/${payload.id}`,
      requestOptions,
    )
    const json = await respuesta.json()
    return NextResponse.json(json)
  }
  return NextResponse.json({ error: 'No estas autorizado' })
}
