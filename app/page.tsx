import Hero from './components/Hero'
import Consultas from './components/consultasHome/consultas'
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
