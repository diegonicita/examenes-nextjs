import React from 'react'
import Hero from '@/app/(pages)/home/components/hero'
import Review from '@/app/(pages)/home/components/reviews'
import Consultas from '@/app/(pages)/home/components/consults/consults'

const Home = () => {
  return (
    <>
      <Hero />
      <Consultas />
      <Review />
    </>
  )
}

export default Home

export const metadata = {
  title: 'Home Page',
}
