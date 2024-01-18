import { Option } from './option'
import { useState } from 'react'

const Question = ({
  questionNumber,
  title,
  description,
  image,
  year,
  correct,
  options,
}: {
  questionNumber: number
  title: string
  description: string
  image: string
  year: number
  correct: number
  options: string[]
}) => {
  const [optionAnswered, setOptionAnswered] = useState<number | null>(null)
  const handleAnswered = (numero: number) => {
    if (optionAnswered === null) setOptionAnswered(numero)
  }

  return (
    <div className="my-4 text-md">
      <div className="card-body p-0">
        <h2 className="text-md font-bold">
          {title} - Año {year.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </h2>
        <div className="w-full text-pretty">{description}</div>
        <div className="card-actions m-0">
          {options.map(
            (option, index) =>
              option && (
                <Option
                  key={index}
                  questionNumber={questionNumber}
                  handleAnswered={handleAnswered}
                  optionAnswered={optionAnswered}
                  correct={correct}
                  optionNumber={index + 1}
                  texto={option}
                />
              ),
          )}
        </div>
      </div>
    </div>
  )
}

export default Question
