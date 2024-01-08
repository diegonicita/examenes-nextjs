'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Searchbar from './searchbar'

export default function QuestionPage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const id = searchParams.get('search') as string

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  let defaultValue = searchParams.get('query') as string | undefined | null
  if (defaultValue === null) {
    defaultValue = undefined
  }

  return <Searchbar handleSearch={handleSearch} defaultValue={defaultValue} />
}
