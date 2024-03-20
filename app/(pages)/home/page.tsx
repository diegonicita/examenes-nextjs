import React from 'react'
import Hero from '@/app/(pages)/home/components/hero/hero'
import Review from '@/app/(pages)/home/components/reviews'
import LeftColumn from './components/consults/leftColumn'
import ConsultForm from '@/app/components/form/consult/container'
import Prices from './components/plans/plans'
import Faq from './components/faq/faq'
import InputHome from './components/inputHome/inputHome'

const Home = () => {
  return (
    <>
      <Hero />
      <InputHome />
      <div className="mx-auto max-w-[55rem] mb-8">
        <Prices />
        <Faq />
        <div className="flex flex-col items-center mt-14">
          <h2 className="text-3xl font-bold">
            <i className="fa-solid fa-circle-question text-primary"></i>
            Envíanos una consulta
          </h2>
          <span className="p-2 text-center sm:text-left">
            Cualquier sea tu problema o sugerencia, nos pondremos en contacto
          </span>
        </div>
        <div className="flex mt-4">
          <LeftColumn />
          <ConsultForm />
        </div>
        {/* <Review /> */}
      </div>
    </>
  )
}

export default Home

export const metadata = {
  title: 'Home Page',
}
