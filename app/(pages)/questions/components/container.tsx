'use client'
import { RowDataPacket } from 'mysql2'
import React, { ReactNode, useRef } from 'react'
import Searchbar from '@/app/(pages)/questions/components/searchbar'
import Words from '@/app/(pages)/questions/components/words/words'

const Container = ({
  query,
  result,
  currentPage,
  children,
}: {
  query: string
  result: RowDataPacket | undefined
  children: ReactNode
  currentPage: number
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <Searchbar inputRef={inputRef} />
      {query !== '' && query.length > 2 && (
       <Words query={query} result={result} inputRef={inputRef}/>
      )}
      {children}
    </div>
  )
}

export default Container
