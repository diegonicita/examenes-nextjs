'use client'
import { Option } from './option'
import { useState } from 'react'
import type { Question as QuestionType } from '@/app/models/Question'

const Question = ({ item }: { item: QuestionType }) => {
  const [optionAnswered, setOptionAnswered] = useState<number | null>(null)
  const handleAnswered = (numero: number) => {
    if (optionAnswered === null) setOptionAnswered(numero)
  }

  const data = {
    title: 'Pregunta N°' + item.numero.toString(),
    questionNumber: item.numero,
    description: item.texto,
    year: item.ano,
    correct: item.correcta,
    options: [
      item.opcion1,
      item.opcion2,
      item.opcion3,
      item.opcion4,
      item.opcion5,
    ],
  }

  return (
    <div className="my-4 text-md">
      <div className="card-body p-0">
        <h2 className="text-md font-bold">
          {data.title} - Año{' '}
          {data.year.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </h2>
        <div className="w-full text-pretty">{data.description}</div>
        <div className="card-actions m-0">
          {data.options.map(
            (option, index) =>
              option && (
                <Option
                  key={index}
                  questionNumber={data.questionNumber}
                  handleAnswered={handleAnswered}
                  optionAnswered={optionAnswered}
                  correct={data.correct}
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
