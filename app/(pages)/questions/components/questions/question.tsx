'use client'
import { Option } from './option'
import type { QuestionSQL as QuestionType } from '@/app/models/QuestionSQL'
/* Instruments */
import {
  useSelector,
  useDispatch,
  questionSlice,
  selectQuestion,
} from '@/app/lib/redux'
import Image from 'next/image'

const Question = ({
  item,
  userId,
}: {
  item: QuestionType
  userId: number | null
}) => {
  const handleAnswered = (numero: number) => {
    dispatch(
      questionSlice.actions.setQuestion({
        id: item.id,
        selected: numero,
        examenId: item.examen,
        correct: item.correcta === numero ? true : false,
        year: item.ano,
        userId: userId ? userId : 0,
      }),
    )
  }
  const dispatch = useDispatch()
  const answered = useSelector((state) =>
    selectQuestion(state, item.id, userId ? userId : 0),
  )

  const data = {
    id: item.id,
    title: `Pregunta N°${item.numero.toString()}`,
    questionNumber: item.numero,
    description: item.texto,
    year: item.ano,
    examen: item.examen,
    correct: item.correcta,
    options: [
      item.opcion1,
      item.opcion2,
      item.opcion3,
      item.opcion4,
      item.opcion5,
    ],
    clasification: [
      item.clasifica1,
      item.clasifica2,
      item.clasifica3,
      item.clasifica4,
      item.clasifica5,
    ],
  }

  function formatearNumero(numero: number, cantidadDigitos: number) {
    const numeroString = numero.toString()
    const cantidadDigitosNumero = numeroString.length
    const cantidadCeros = cantidadDigitos - cantidadDigitosNumero
    const ceros = '0'.repeat(cantidadCeros)
    return ceros + numeroString
  }

  return (
    <div className="my-4 text-md min-w-full">
      <div className="card-body p-0">
        <h2 className="text-md font-bold">
          {data.title} - Año{' '}
          {data.year.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          {' - '} id:{data.id}
        </h2>
        <div className="w-full text-pretty">{data.description}</div>
        {data.clasification.includes(37) && data.examen === 6 && (
          <div className="flex items-center justify-center">
            <Image
              width={320}
              height={320}
              className="w-full max-w-lg shadow-md m-4 rounded mb-6"
              src={`https://mercado.webapp.ar/images_medicina/choices/image-${formatearNumero(
                data.examen,
                4,
              )}-${formatearNumero(data.questionNumber, 4)}-${formatearNumero(
                data.year,
                4,
              )}.jpg`}
              alt="imagen de la pregunta"
            />
          </div>
        )}
        <div className="card-actions m-0">
          {data.options.map(
            (option, index) =>
              option && (
                <Option
                  key={data.questionNumber + index.toString()}
                  questionNumber={data.questionNumber}
                  handleAnswered={handleAnswered}
                  optionAnswered={answered?.selected}
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
