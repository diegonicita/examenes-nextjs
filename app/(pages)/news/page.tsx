import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import CreatenewForm from './createNews'
import type { UserType } from '@/app/models/User'
import { redirect } from 'next/navigation'
import News from '../home/components/news/news'
import dataNews from './action/data/dataNews'
import type { NewsItem } from '@/app/models/news/newData'

export default async function newsPage() {
  const currentUser = (await getInfoAuthCookie()) as UserType
  if (currentUser?.role !== 'admin') {
    redirect('/')
  }
  const data = (await dataNews()) as NewsItem[]
  return (
    <section className='flex flex-col items-center'>
      {' '}
      <h1>hola</h1>
      <CreatenewForm />
      <div className='w-[40rem] mt-5'>
        <News data={data} currentUser={currentUser} />
      </div>
    </section>
  )
}
