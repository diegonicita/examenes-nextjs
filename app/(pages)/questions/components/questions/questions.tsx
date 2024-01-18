import { RowDataPacket } from 'mysql2'
import Reactions from './reactions'
import Comments from './comments'

const QuestionList = async ({
  query,
  currentPage,
  result,
 
}: {
  query: string
  currentPage: number
  result: RowDataPacket | undefined
  
}) => {
 
  
  return (
    <div className="mx-auto max-w-[70ch]">
      {result &&
        result.map((item: any, index: number) => (
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
            {/* <div className="font-bold pb-2"> Respuesta Correcta: {item.correcta} </div>           */}
            <Reactions id_question={item.id}/>
            <div className="flex flex-row">
            <Comments  />
            </div>
          </div>
        ))}
    </div>
  )
}

export default QuestionList
