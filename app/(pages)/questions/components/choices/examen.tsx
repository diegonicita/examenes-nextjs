'use client'
import Reactions from '@/app/(pages)/questions/components/questions/reactions'
import type { Question as QuestionType } from '@/app/models/Question'
import Question from './question'

export const Examen = ({
  data,
  valorations,
}: {
  data: any
  valorations: any | undefined
}) => {
  return (
    <>
      {data &&
        data.map((item: QuestionType, index: number) => (
          <div
            key={index}
            className=" border border-gray-400 rounded my-4 px-4 pb-4"
          >
            <Question
              title={'Pregunta N°' + item.numero}
              questionNumber={item.numero}
              description={item.texto}
              year={item.ano}
              correct={item.correcta}
              options={[
                item.opcion1,
                item.opcion2,
                item.opcion3,
                item.opcion4,
                item.opcion5,
              ]}
              image={''}
            />
            {valorations && (
              <>
                <Reactions id_question={item.id} valorations={valorations} />
              </>
            )}
          </div>
        ))}
    </>
  )
}

export default Examen
