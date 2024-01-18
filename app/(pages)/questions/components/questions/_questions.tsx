import Reactions from './reactions'

// DEPRECATED //
// AHORA USAMOS examen

const QuestionList = async ({
  questions,
  valorations,
}: {
  questions: any | undefined
  valorations: any | undefined
}) => {
  return (
    <div className="mx-auto max-w-[70ch]">
      {questions &&
        questions.map((item: any, index: number) => (
          <div key={index} className=" border border-gray-400 rounded my-4 p-4">
            <div className="font-bold mt-2 mb-2">
              {'Pregunta N°: ' + item.numero} {item.texto}
            </div>
            <div>{'1) ' + item.opcion1}</div>
            <div>{'2) ' + item.opcion2}</div>
            <div>{'3) ' + item.opcion3}</div>
            <div>{'4) ' + item.opcion4}</div>
            {item.opcion5 !== '' && (
              <div className="max-w-prose">{'5) ' + item.opcion5}</div>
            )}
            <div className="font-bold pb-2"> Id: {item.id} </div>
            <Reactions id_question={item.id} valorations={valorations} />
          </div>
        ))}
    </div>
  )
}

export default QuestionList