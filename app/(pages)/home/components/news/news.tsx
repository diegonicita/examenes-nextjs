'use client'
import Link from 'next/link'
import SliderResponsive from './slider'
import DeleteForm from '@/app/(pages)/news/deleteForm'
import type { UserType } from '@/app/models/User'
import type { NewsItem } from '@/app/models/news/newData'

export default function News({
  data,
  currentUser,
}: { data: NewsItem[]; currentUser: UserType }) {
  console.log(data)
  return (
    <section className='mb-8'>
      <h4 className='font-bold text-center mb-2'>
        Noticias que te pueden interesar
      </h4>

      <SliderResponsive>
        {data.map(item => (
          <div key={item.id} className='card w-96 bg-base-100 shadow-xl '>
            <Link href='/news'>
              <div className='flex flex-row'>
                <img
                  src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                  alt=''
                />

                {currentUser?.role === 'admin' && <DeleteForm id={item.id} />}
              </div>
              <div className='card-body'>
                <h2 className='card-title'>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </SliderResponsive>
    </section>
  )
}
