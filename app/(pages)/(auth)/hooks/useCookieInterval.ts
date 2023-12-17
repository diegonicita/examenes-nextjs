import { useRef, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const useCookieInterval = (cookieName: string, intervalTime: number) => {
  const cookieValue = useRef(Cookies.get(cookieName))
  const [changeCookie, setChangeCookie] = useState<boolean>(false)

  useEffect(() => {
    // Función para verificar y actualizar el valor de la cookie
    const checkCookie = () => {
      console.log("tick")
      const currentValue = Cookies.get(cookieName)
      // console.log(cookieName)
      // console.log(currentValue)
      if (currentValue !== cookieValue.current) {
        // console.log('change cookie state')
        setChangeCookie(prevChangeCookie => !prevChangeCookie)
        cookieValue.current = currentValue
      }
    }

    // Establecer el intervalo
    const intervalId = setInterval(checkCookie, intervalTime)

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId)

    // Dependencia vacía para que solo se ejecute al montar y desmontar
  }, [])

  return { cookie: cookieValue.current, changeCookie }
}
