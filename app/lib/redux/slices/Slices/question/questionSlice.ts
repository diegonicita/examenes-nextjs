import type { ReduxState } from '@/app/lib/redux'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { QuestionLib } from '@/app/models/QuestionLib'

export interface QuestionSliceState {
  answered: QuestionLib[]
}

const questions = () => {
  if (typeof window !== 'undefined')
    if (localStorage.getItem('question') !== null) {
      const r = localStorage.getItem('question')
      return JSON.parse(r || '[]')
    }
  return []
}

const initialState: QuestionSliceState = {
  answered: questions(),
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<QuestionLib>) => {
      const { id } = action.payload
      // Verificar si la pregunta con el mismo ID ya existe
      const existingQuestionIndex = state.answered.findIndex(
        (question) => question.id === id,
      )
      // Si no existe, agregarla al array
      if (existingQuestionIndex === -1) {
        state.answered.push(action.payload)
      }
      localStorage.setItem('question', JSON.stringify(state.answered))
    },
  },
})

export const selectQuestion = (state: ReduxState, id: number) => {
  // Utilizar find para buscar la pregunta con el ID especificado
  return state.question.answered.find((question) => question.id === id)
}

export const selectAllQuestion = (state: ReduxState) => {
  // Utilizar find para buscar la pregunta con el ID especificado
  return state.question.answered
}
