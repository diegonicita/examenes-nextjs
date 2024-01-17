'use client'
import { RowDataPacket } from 'mysql2'
import React, { ReactNode, useRef } from 'react'
import Searchbar from '@/app/(pages)/questions/components/searchbar'
import WordsSuggestions from '@/app/(pages)/questions/components/words/wordsSuggestions'
import { unknown } from 'zod'

const SearchContainer = ({
  query,
  result,
  currentPage,
  wordsSuggestions,
  children,
}: {
  query: string
  result: object | undefined
  children: ReactNode
  wordsSuggestions: { palabra: string; cantidad: unknown }[]
  currentPage: number
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <Searchbar inputRef={inputRef} />
      {query !== '' && query.length > 2 && (
        <WordsSuggestions
          query={query}          
          inputRef={inputRef}
          wordsSuggestions={wordsSuggestions}
        />
      )}
      {children}
    </div>
  )
}

export default SearchContainer