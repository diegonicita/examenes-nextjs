'use client'
import React, { useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const WordsSuggestions = ({
  query,
  inputRef,
  wordsSuggestions,
  reset,
  questionsCount,
}: {
  query: string
  inputRef: React.RefObject<HTMLInputElement>
  wordsSuggestions: { palabra: string; cantidad: unknown }[]
  reset: string | null | undefined
  questionsCount: number | null
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [localReset, setLocalReset] = useState(0)

  const handleAddWord = (term: string) => {
    console.log('Add word')
    const params = new URLSearchParams(searchParams.toString())
    const currentQuery = params.get('query')
    if (term) {
      const updatedQuery = currentQuery + ' ' + term
      if (inputRef.current) inputRef.current.value = updatedQuery
      params.set('query', updatedQuery)
    } else if (term) {
      // Si no hay un valor actual, simplemente establece el nuevo término
      params.set('query', term)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleWord = () => {
    setLocalReset(localReset === 0 ? 1 : 0)
  }

  return (
    <div
      key={reset + localReset.toString()}
      className="border border-gray w-full"
    >
      {typeof document !== 'undefined' &&
        inputRef.current === document.activeElement && (
          <>
            <button className="py-2 pl-2 text-left" onClick={handleWord}>
              <span className="font-bold">Búsqueda actual:</span> {query}
              <span className="indicator my-1 px-4">
                <span className="indicator-item badge  indicator-middle indicator-end badge-secondary ">
                  +{questionsCount}
                </span>
              </span>
              <div className="pl-4 text-xs mt-2">
                <span className="font-bold">Usuarios Free:</span> no pueden ver
                todos los resultados de la busqueda
              </div>
              <div className="pl-4 text-xs">
                <span className="font-bold">Usuarios Premium:</span> pueden ver
                todos los resultados de la busqueda (sin límites)
              </div>
            </button>
            <div className="font-bold pt-2 pl-2"> Sugerencias: </div>
          </>
        )}
      <ul>
        {typeof document !== 'undefined' &&
          inputRef.current === document.activeElement &&
          wordsSuggestions.map(
            ({ palabra, cantidad }: any, index: number) =>
              cantidad > 1 &&
              query !== palabra && (
                <li key={index} className="indicator my-4 px-8 flex">
                  <span className="indicator-item badge  indicator-middle indicator-end badge-secondary ">
                    +{cantidad}
                  </span>
                  <button className="" onClick={() => handleAddWord(palabra)}>
                    {query} + {palabra}
                  </button>
                </li>
              ),
          )}
      </ul>
    </div>
  )
}

export default WordsSuggestions
