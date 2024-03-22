'use client'
import Link from 'next/link'
import SliderResponsive from './slider'

export default function News(data) {
  console.log(data)

  return (
    <section className='mb-8'>
      <h4 className='font-bold text-center mb-2'>
        Noticias que te pueden interesar
      </h4>

      <SliderResponsive>
        {data.data.map(item => (
          <div
            key={item.id}
            className='card w-96 bg-base-100 shadow-xl '
            style={{ marginRight: '10px' }}
          >
            <Link href='/news'>
              <img
                src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                alt=''
              />
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
