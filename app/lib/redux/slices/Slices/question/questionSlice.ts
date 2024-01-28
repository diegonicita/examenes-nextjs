import type { ReduxState } from '@/app/lib/redux'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { QuestionLib } from '@/app/models/QuestionLib'
export interface QuestionSliceState {
  answered: QuestionLib[]
}

const initialState: QuestionSliceState = {
  answered: [],
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<QuestionLib>) => {
      const { id } = action.payload
      // Verificar si la pregunta con el mismo ID ya existe
      const existingQuestion = state.answered.find(
        (question) => question.id === id,
      )
      // Si no existe, agregarla al array
      if (!existingQuestion) {
        state.answered.push(action.payload)
      }
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
