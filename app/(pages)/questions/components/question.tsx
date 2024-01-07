'use client'

// import { useGetQuestionByIdQuery } from '@/app/lib/services/choice'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Searchbar from './searchbar'

export default function QuestionPage() {
  
  // const { data, error, isLoading } = useGetQuestionByIdQuery(5)
  const isLoading = false
  const data = {
    id: 1,
    texto: '¿Cuantos huesos, aproximadamente, tiene un ser humano?',
    opcion1: '100 huesos',
    opcion2: '200 huesos',
    opcion3: '300 huesos',
    opcion4: '400 huesos',   
  }

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const id = searchParams.get('search') as string
  console.log('search', id)

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      <h1 className="font-bold mb-4">
        Pregunta Id: <span>{!isLoading && data?.id}</span>
      </h1>
      {!isLoading && (
        <>
          <div className="">{data?.texto}</div>
          <div className="mt-4">
            {'1)'} {data?.opcion1}
          </div>
          <div className="">
            {'2)'} {data?.opcion2}
          </div>
          <div className="">
            {'3)'} {data?.opcion3}
          </div>
          <div className="">
            {'4)'} {data?.opcion4}
          </div>
        </>
      )}
    </>
  )
}
