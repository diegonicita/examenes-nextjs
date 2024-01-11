import executeQuery from '@/app/server-actions/helpers/mysqldb'
import { RowDataPacket } from 'mysql2'

const QuestionList = async ({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) => {
  console.log('query', query)
  const querylike = '%' + query + '%'

  let result = null
  result = (await executeQuery('select * from preguntas where texto like ?', [
    querylike,
  ])) as RowDataPacket

  const conteoPalabras = {} as any
  // Lista de palabras comunes a excluir
  const palabrasExcluidas = [
    'el',
    'en',
    'es',
    'la',
    'los',
    'las',
    'un',
    'una',
    'unos',
    'unas',
    'y',
    'o',
    'pero',
    'por',
    'con',
    'sin',
    'para',
    'a',
    'de',
    'que',
    'se',
    'cual',
    'al',
    'hacia',
    'falta',
    'hace',
    'su',
    'le',
    'como',
    'lo',
    'del',
    'más',
    'si',
    'ya',
    'muy',
    'este',
    'esto',
    'aquí',
    'todo',
    'nos',
    'nosotros',
    'vosotros',
    'ellos',
    'ellas',
    'entre',
    'otro',
    'otros',
    'otra',
    'otras',
    'esto',
    'esto',
    'eso',
    'aquel',
    'aquella',
    'ha',
    'debe',
    'años',
    'mas',
    'siguientes',
    'presenta',
    'esta',
    'tiene',
    'edad',
    'paciente',
  ]

  // Función para limpiar una palabra eliminando caracteres no deseados
  function limpiarPalabra(palabra: string) {
    // Reemplaza los caracteres acentuados por sus equivalentes sin acentos
    palabra = palabra
      .replace(/[áÁ]/g, 'a')
      .replace(/[éÉ]/g, 'e')
      .replace(/[íÍ]/g, 'i')
      .replace(/[óÓ]/g, 'o')
      .replace(/[úÚüÜ]/g, 'u')

    // Elimina paréntesis, corchetes, puntos, comas, dos puntos, signos de pregunta y signos de exclamación al inicio y final de la palabra
    return palabra.replace(/^[([.,:;?!¡¿]+|[)\].,;:?!\¡\¿]+|[.,:;?!¡¿]+$/g, '')
  }

  // Función para contar palabras en un texto y actualizar el conteo global
  function contarPalabras(texto: string) {
    if (typeof texto === 'string') {
      const palabras = texto.split(/\s+/)

      // Itera sobre cada palabra y realiza el conteo
      palabras.forEach((palabra: string) => {
        const palabraLimpia = limpiarPalabra(palabra)
        if (
          !palabrasExcluidas.includes(palabraLimpia.toLowerCase()) &&
          !/\d/.test(palabraLimpia)
        ) {
          // Convierte la palabra a minúsculas para evitar contar palabras con diferente capitalización como diferentes
          const palabraLowerCase = palabraLimpia.toLowerCase()
          // Incrementa el conteo de la palabra en el objeto
          conteoPalabras[palabraLowerCase] =
            (conteoPalabras[palabraLowerCase] || 0) + 1
        }
      })
    }
  }

  result?.map((item: any, index: number) => contarPalabras(item.texto))

  // Convertir las cantidades a números y ordenar de mayor a menor
  const palabrasOrdenadas = Object.entries(conteoPalabras)
    .map(([palabra, cantidad]) => ({ palabra, cantidad }))
    .sort((a: any, b: any) => b.cantidad - a.cantidad)

  // console.log(conteoPalabras)
  // console.log(Object.keys(conteoPalabras).length)
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
      <ul>
        {palabrasOrdenadas.map(
          ({ palabra, cantidad }: any) =>
            cantidad > 2 && (
              <li key={palabra}>
                <strong>{palabra}:</strong> {cantidad}
              </li>
            ),
        )}
      </ul>
    </div>
  )
}

export default QuestionList
