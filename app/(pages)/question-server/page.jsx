import executeQuery from '@/server-actions/mysqldb'

const Page = async () => {
  const result = await executeQuery('select * from preguntas where id=?', [2048])
  return (
    <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">  
        {result && (
          <>
            <h1 className="font-bold mb-4">
              Pregunta Id: <span>{result[0].id}</span>
            </h1>
            <>
              <div className="">{result[0].texto}</div>
              <div className="mt-4">
                {'1)'} {result[0].opcion1}
              </div>
              <div className="">
                {'2)'} {result[0].opcion2}
              </div>
              <div className="">
                {'3)'} {result[0].opcion3}
              </div>
              <div className="">
                {'4)'} {result[0].opcion4}
              </div>
            </>
          </>
        )}
      
    </div>
  )
}

export const metadata = {
  title: 'Preguntas Server',
}

export default Page
