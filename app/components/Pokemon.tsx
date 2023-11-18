'use client'

import { useGetPokemonByNameQuery } from '@/lib/services/pokemon'

export default function Pokemon() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('pikachu')
  return (
    <>
      <h1>Pokemon</h1>
      {!isLoading && (
        <>
          <figure className="bg-blue-300 border border-black">
            <img src={data?.sprites.front_default} alt="" />
          </figure>
          <div className="">{data?.name}</div>
        </>
      )}
    </>
  )
}
