import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

const QuestionList = async ({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) => {
  const isLoading = false
  const data = {
    id: 1,
    texto: '¿Cuantos huesos, aproximadamente, tiene un ser humano?',
    opcion1: '100 huesos',
    opcion2: '200 huesos',
    opcion3: '300 huesos',
    opcion4: '400 huesos',
  }
  console.log('query', query)
  const querylike = '%' + query + '%'

  let result = null
  result = (await executeQuery('select * from preguntas where texto like ?', [
    querylike,
  ])) as RowDataPacket  

  return (
    <div className="mx-auto">
      {result?.map((item: any, index: number) => (
        <div key={index} className="max-w-prose">
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
          <br />
        </div>
      ))}
    </div>
  )
}

export default QuestionList
