'use client'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import SearchItem from './searchItem'

const Searchbar = (props) => {
  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const [autocompleteState, setAutoCompleteState] = useState({
    collections: [],
    isOpen: false,
  })
  const [isClient, setIsClient] = useState(false)  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
    }
  }, [])

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Busca una pregunta por palabra clave',
        onStateChange: ({ state }) => setAutoCompleteState(state),
        getSources: () => [
          {
            sourceId: 'questions',
            getItems: ({ query }) => {
              if (!!query && query.length > 1) {
                return fetch(`/api/get-questions?query=${query}`).then((res) =>
                  res.json(),
                )
              }
              return []
            },
          },
        ],
        ...props,
      }),
    [props],
  )

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  })

  return (
    <>
      {isClient && (
        <div className="mb-3 min-w-[36rem]">
          Algolia AutoComplete Test
          <form
            ref={formRef}
            className="relative mb-4 flex w-full flex-wrap items-stretch"
            {...formProps}
          >
            <input
              ref={inputRef}
              className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              {...inputProps}
            />

            <button
              className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {autocompleteState.isOpen && (
              <div
                className="absolute bg-white top-10 left-0 border border-gray-300 z-10"
                ref={panelRef}
                {...autocomplete.getPanelProps()}
              >
                {autocompleteState.collections.map((collection, index) => {
                  const { items } = collection
                  return (
                    <section key={'section' + index}>
                      {items.length > 0 && (
                        <ul {...autocomplete.getListProps()}>
                          {items.map((item) => {
                            return (
                              <li key={item.id}>
                                <SearchItem id={item.id} texto={item.texto} />
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </section>
                  )
                })}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  )
}

export default Searchbar
