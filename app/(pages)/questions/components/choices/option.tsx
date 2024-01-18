import { useEffect } from 'react'
// import confetti from 'canvas-confetti'
import { TailwindToaster } from './tailwindToaster'
import { notifyCorrect } from './notifyCorrect'
import { notifyIncorrect } from './notifyIncorrect'

export const Option = ({
  handleAnswered,
  optionAnswered,
  correct,
  optionNumber,
  texto,
  questionNumber,
}:{
  handleAnswered: (option: number) => void
  optionAnswered: number | null
  correct: number
  optionNumber: number
  texto: string
  questionNumber: number
}) => {
  useEffect(() => {
    if (optionAnswered === optionNumber && optionAnswered === correct) {
      notifyCorrect(questionNumber)
      // confetti()
    }
    if (optionAnswered === optionNumber && optionAnswered !== correct) {
      notifyIncorrect(questionNumber)
    }
  }, [optionAnswered])

  let backgroundColor = null
  if (optionAnswered === optionNumber && optionAnswered === correct) {
    backgroundColor =
      'bg-success text-white hover:bg-success hover:text-white'
  }
  if (optionAnswered === optionNumber && optionAnswered !== correct) {
    backgroundColor =
      'bg-error text-white hover:bg-error hover:text-white'
  }
  if (
    optionAnswered &&
    optionAnswered !== optionNumber &&
    optionNumber === correct
  ) {
    backgroundColor =
      'bg-success text-white hover:bg-success hover:text-white'
  }

  return (
    <>
      <TailwindToaster />
      <div
        className={`py-2 btn btn-outline btn-md w-full h-fit text-base text-start justify-start ${backgroundColor} text-pretty`}
        onClick={() => handleAnswered(optionNumber)}
      >
        {texto}
      </div>
    </>
  )
}
