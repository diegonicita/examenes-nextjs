import React from 'react'
import Hero from '@/app/(pages)/home/components/hero'
import Consultas from '@/app/(pages)/home/components/consultas'
import Review from '@/app/(pages)/home/components/reviews'

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
