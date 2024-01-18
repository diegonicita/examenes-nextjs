'use client'
import React, { ReactNode, useRef, useState } from 'react'
import Searchbar from '@/app/(pages)/questions/components/searchbar'
import WordsSuggestions from '@/app/(pages)/questions/components/words/wordsSuggestions'

const SearchContainer = ({
  query,
  currentPage,
  wordsSuggestions,
  children,
}: {
  query: string
  children: ReactNode
  wordsSuggestions: { palabra: string; cantidad: unknown }[]
  currentPage: number
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [reset, setReset] = useState<string | null | undefined>(undefined)
  const handleChangeResetKey = () => {
    setReset(Math.random().toString() + Date.now().toString())
  }

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
        />
      )}
      {children}
    </div>
  )
}

export default SearchContainer
