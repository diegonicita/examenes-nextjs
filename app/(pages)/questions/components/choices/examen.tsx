import Reactions from '@/app/(pages)/questions/components/questions/commentContainer'
import type { Question as QuestionType } from '@/app/models/Question'
import Question from './question'

export const Examen = ({ data }: { data: any }) => {
  return (
    <>
      {data &&
        data.map((item: QuestionType, index: number) => (
          <div
            key={index}
            className=" border border-gray-400 rounded my-4 px-4 pb-4"
          >
            <Question
              data={{
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
              }}
            />
          </div>
        ))}
    </>
  )
}

export default Examen
