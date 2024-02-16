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
      const { id, userId } = action.payload
      // Verificar si la pregunta con el mismo ID ya existe
      const existingQuestionIndex = state.answered.findIndex(
        (question) => question.id === id && question.userId === userId,
      )
      // Si no existe, agregarla al array
      if (existingQuestionIndex === -1) {
        state.answered.push(action.payload)
      }
      localStorage.setItem('question', JSON.stringify(state.answered))
    },
    deleteQuestionsByExamenId: (
      state,
      action: PayloadAction<{ examenId: number; userId: number }>,
    ) => {
      const examenIdToDelete = action.payload.examenId
      const userIdToDelete = action.payload.userId
      for (let i = state.answered.length - 1; i >= 0; i--) {
        const question = state.answered[i]
        if (
          question.userId === userIdToDelete &&
          question.examenId === examenIdToDelete
        ) {
          state.answered.splice(i, 1)
        }
      }
      localStorage.setItem('question', JSON.stringify(state.answered))
    },
  },
})

export const selectQuestion = (
  state: ReduxState,
  id: number,
  userId: number | null,
) => {
  // Utilizar find para buscar la pregunta con el ID especificado
  return state.question.answered.find(
    (question) => question.id === id && question.userId === userId,
  )
}

export const selectAllQuestion = (state: ReduxState) => {
  // Utilizar find para buscar la pregunta con el ID especificado
  return state.question.answered
}
