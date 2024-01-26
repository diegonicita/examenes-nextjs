'use client'
import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const WordsSuggestions = ({
  query,
  inputRef,
  wordsSuggestions,
  reset  
}: {
  query: string
  inputRef: React.RefObject<HTMLInputElement>
  wordsSuggestions: { palabra: string; cantidad: unknown }[]
  reset: string | null | undefined  
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleAddWord = (term: string) => {
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
  console.log(query)
  console.log(wordsSuggestions)

  return (
    <div key={reset} className="mx-auto border border-gray">
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
