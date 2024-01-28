import { QuestionLib } from '@/app/models/QuestionLib'

export const getStatistics = ({
  data,
  year,
  id,
}: {
  data: QuestionLib[]
  year: number | undefined
  id: number
}) => {
  const total = data.filter((answeredQuestion) => {
    console.log(year)
    if (year === undefined) return answeredQuestion.examenId === id
    else {
      return answeredQuestion.examenId === id && answeredQuestion.year === year
    }
  }).length

  const answered = data.filter((answeredQuestion) => {
    if (year === undefined) return answeredQuestion.examenId === id
    else {
      return answeredQuestion.examenId === id && answeredQuestion.year === year
    }
  }).length

  const corrects = data.filter((answeredQuestion) => {
    if (year === undefined)
      return answeredQuestion.examenId === id && answeredQuestion.correct
    else {
      return (
        answeredQuestion.examenId === id &&
        answeredQuestion.correct &&
        answeredQuestion.year === year
      )
    }
  }).length
  const percentCorrect =
    answered !== 0 ? ((corrects * 100) / answered).toFixed(1) : 0
  const percentNotCorrect =
    answered !== 0 ? (((answered - corrects) * 100) / answered).toFixed(1) : 0

  return {
    total,
    answered,
    corrects,
    percentCorrect,
    percentNotCorrect,
  }
}
