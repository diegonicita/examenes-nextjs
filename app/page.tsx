import Hero from './components/hero'
import Consultas from './components/consultas/consultas'
import Review from './components/reviews/reviews'

export default function IndexPage() {
  return (
    <>
      <Hero />
      <Review />     
      <Consultas /> 
    </>
  )
}

export const metadata = {
  title: 'ERM Residencias Médicas',
}
