import Hero from './components/hero'
import Consultas from './components/home/consultas'
import Review from './components/reviews/reviews'

export default function IndexPage() {
  return (
    <>
      <Hero />
      <Consultas /> 
      <Review />     
    </>
  )
}

export const metadata = {
  title: 'ERM Residencias Médicas',
}
