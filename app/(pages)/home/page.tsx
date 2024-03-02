import React from 'react'
import Hero from '@/app/(pages)/home/components/hero/hero'
import Review from '@/app/(pages)/home/components/reviews'
import LeftColumn from './components/consults/leftColumn'
import ConsultForm from '@/app/components/form/consult/container'

const Home = () => {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-[55rem] mb-8">
        <div className="flex">
          <LeftColumn />
          <ConsultForm />
        </div>
      </div>
      {/* <Review /> */}
    </>
  )
}

export default Home

export const metadata = {
  title: 'Home Page',
}
