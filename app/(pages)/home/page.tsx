import React from 'react'
import Hero from '@/app/(pages)/home/components/hero/hero'
import Review from '@/app/(pages)/home/components/reviews'
import LeftColumn from './components/consults/leftColumn'
import ConsultForm from '@/app/components/form/consultFormContainer'
import { consultFormAction } from '@/app/components/form/consultFormAction'

const Home = () => {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-[55rem] mb-8">
        <div className="flex">
          <LeftColumn />
          <ConsultForm formAction={consultFormAction} />
        </div>
      </div>
    </>
  )
}

export default Home

export const metadata = {
  title: 'Home Page',
}
