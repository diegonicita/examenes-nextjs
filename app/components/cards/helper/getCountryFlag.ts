import flagImageAR from '@/app/assets/ar.gif'
import flagImageES from '@/app/assets/es.gif'
import flagImagePE from '@/app/assets/pe.gif'
import flagImageMX from '@/app/assets/mx.gif'

export const getCountryFlag = (country: string) => {
  console.log(country)
  switch (country) {
    case 'Argentina':
      return flagImageAR
    case 'Perú':
      return flagImagePE
    case 'Peru':
      return flagImagePE
    case 'Mexico':
      return flagImageMX
    case 'México':
      return flagImageMX
    default:
      return flagImageES
  }
}

export default getCountryFlag
