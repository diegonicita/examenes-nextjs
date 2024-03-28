'use client'
import Link from 'next/link'
const SliderResponsive = dynamic(() => import('./slider'))
import DeleteForm from '@/app/(pages)/news/deleteForm'
import type { UserType } from '@/app/models/User'
import type { NewsItem } from '@/app/models/news/newData'
import Image from 'next/image'
import dynamic from 'next/dynamic'

export default function News({
  data,
  currentUser,
}: {
  data: NewsItem[]
  currentUser: UserType
}) {
  return (
    <section className='mb-8'>
      <div className='flex flex-col gap-2 text-center mt-12 mb-8'>
        <h2 className='font-bold text-3xl'>Noticias</h2>
        <span>Noticias que te pueden interesar</span>
      </div>

      <SliderResponsive>
        {data?.map(item => (
          <div key={item.id} className='card w-96 bg-base-100'>
            <>
              <div className='flex flex-row h-64 w-full relative'>
                <Image
                  src={item.url_image}
                  alt='imagen de una noticia'
                  layout='fill' // required
                  objectFit='cover' // change to suit your needs
                  className='object-cover'
                />
                {currentUser?.role === 'admin' && <DeleteForm id={item.id} />}
              </div>
              <div className='card-body justify-center items-center mt-0 pt-4 shadow-sm my-4 '>
                <h2 className='card-title'>{item.title}</h2>
                <p className='text-balance text-center'>{item.description}</p>
                <Link
                  target={
                    item.url_news === '' ||
                    item.url_news.startsWith('https://examenes.com.ar/')
                      ? '_self'
                      : '_blank'
                  }
                  className='w-full mt-2'
                  href={!item.url_news ? '#' : item.url_news}
                >
                  <button type='button' className='btn btn-neutral w-full'>
                    Leer más
                  </button>
                </Link>
              </div>
            </>
          </div>
        ))}
      </SliderResponsive>
    </section>
  )
}
