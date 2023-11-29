// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Question } from './types'

// Define a service using a base URL and expected endpoints
export const choiceApi = createApi({
  reducerPath: 'choiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mercado.webapp.ar/api/' }),
  endpoints: (builder) => ({
    getQuestionById: builder.query<Question, number>({
      query: (num) => `preguntas/${num}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQuestionByIdQuery } = choiceApi
