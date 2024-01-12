'use client'
import React from 'react'
import { RowDataPacket } from 'mysql2'
import { excludedWords } from './excludedWords'
import { cleanWord } from './cleanWord'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const Words = ({
  query,
  result,
}: {
  query: string
  result: RowDataPacket | undefined
}) => {
  const conteoPalabras = {} as any
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleAddWord = (term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentQuery = params.get('query')
    if (term) {
      const updatedQuery = currentQuery+' '+term
      params.set('query', updatedQuery)
    } else if (term) {
      // Si no hay un valor actual, simplemente establece el nuevo término
      params.set('query', term)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  // Función para contar palabras en un texto y actualizar el conteo global
  const countWords = (texto: string) => {
    if (typeof texto === 'string') {
      const palabrasSinFiltrar = texto.split(/\s+/)
      const palabras = palabrasSinFiltrar.filter(
        (palabra) => palabra.length > 4,
      )

      // Itera sobre cada palabra y realiza el conteo
      palabras.forEach((palabra: string) => {
        const palabraLimpia = cleanWord(palabra)
        if (
          !excludedWords.includes(palabraLimpia.toLowerCase()) &&
          !/\d/.test(palabraLimpia)
        ) {
          // Convierte la palabra a minúsculas para evitar contar palabras con diferente capitalización como diferentes
          const palabraLowerCase = palabraLimpia.toLowerCase()
          // Incrementa el conteo de la palabra en el objeto
          conteoPalabras[palabraLowerCase] =
            (conteoPalabras[palabraLowerCase] || 0) + 1
        }
      })
    }
  }

  result && result.map((item: any, index: number) => countWords(item.texto))

  // Convertir las cantidades a números y ordenar de mayor a menor
  const palabrasOrdenadas = Object.entries(conteoPalabras)
    .map(([palabra, cantidad]) => ({ palabra, cantidad }))
    .sort((a: any, b: any) => b.cantidad - a.cantidad)

    const palabrasOrdenadas20 = palabrasOrdenadas.slice(0, 20)
  // console.log(conteoPalabras)
  // console.log(Object.keys(conteoPalabras).length)
  return (
    <div className="mx-auto max-w-[100ch]">
      <ul>
        {palabrasOrdenadas20.map(
          ({ palabra, cantidad }: any) =>
            cantidad > 1 && (
              <li key={palabra} className="indicator m-2">
                <span className="indicator-item badge badge-secondary p-2">
                  {cantidad}+
                </span>
                <button className="btn" onClick={() => handleAddWord(palabra)}>
                  {/* {query} */}
                  {palabra}
                </button>
              </li>
            ),
        )}
      </ul>
    </div>
  )
}

export default Words
