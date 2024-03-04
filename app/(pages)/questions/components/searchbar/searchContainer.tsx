'use client'
import React, { ReactNode, useRef, useState } from 'react'
import Searchbar from '@/app/(pages)/questions/components/searchbar/searchbar'
import WordsSuggestions from '@/app/(pages)/questions/components/searchbar/wordsSuggestions'

const SearchContainer = ({
  query,
  currentPage,
  wordsSuggestions,
  children,
  questionsCount
}: {
  query: string
  children: ReactNode
  wordsSuggestions: { palabra: string; cantidad: unknown }[]
  currentPage: number
  questionsCount: number | null
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [reset, setReset] = useState<string | null | undefined>(undefined)
  const handleChangeResetKey = () => {
    setReset(Math.random().toString() + Date.now().toString())
  }

  // console.log(wordsSuggestions)

  return (
    <div className="w-full mx-auto max-w-[75ch] px-1">
      <Searchbar
        inputRef={inputRef}
        handleChangeResetKey={handleChangeResetKey}
      /> 
       {query !== '' && query.length > 2 && (
        <WordsSuggestions
          query={query}
          reset={reset}
          inputRef={inputRef}
          wordsSuggestions={wordsSuggestions}
          questionsCount={questionsCount}
        />
      )}
      {children}
    </div>
  )
}

export default SearchContainer
