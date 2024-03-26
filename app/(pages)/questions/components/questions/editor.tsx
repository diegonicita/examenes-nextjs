'use client'

import { toast } from 'react-hot-toast'

export const notify = (preg: string) =>
  toast.custom((t) => (
    <div
      className={`text-white font-bold bg-success px-6 py-4 shadow  ${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
      Datos de la pregunta {preg} actualizados
    </div>
  ))

import type { QuestionSQL as QuestionType } from '@/app/models/QuestionSQL'
import type { SubjectType } from '@/app/models/Subject'
import { useState } from 'react'
import Question from './question'
import updateQuestion from '../../actions/updateQuestion'
import FirstInputComment from '../social/comments/firstInputComment'
import { UseEmoji } from '@/app/hooks/questions/comments/useEmoji'
import RenderTree from '../social/comments/renderTree'
import type { UserType } from '@/app/models/User'
import AllTheCommentContent from '../social/comments/allTheCommentContent/allthecommentContent'

export const Editor = ({
  data,
  userId,
  temas,
  currentUser,
  treeComments,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any
  userId: number
  temas: SubjectType[]
  currentUser: UserType
  treeComments: string[]
}) => {
  return (
    <>
      {data?.map((item: QuestionType, index: number) => (
        <div
          key={item.id}
          className=" border border-gray-400 rounded my-4 px-4 pb-4"
        >
          <Question item={item} userId={userId} />
          <EditItem item={item} temas={temas} />
          <AllTheCommentContent
            item={item}
            treeComments={treeComments}
            currentUser={currentUser}
          />
        </div>
      ))}
    </>
  )
}

export const EditItem = ({
  item,
  temas,
}: {
  item: QuestionType
  temas: SubjectType[]
}) => {
  const [correcta, setCorrecta] = useState<string>(item.correcta.toString())
  const [clasificaciones, setClasificaciones] = useState<number[]>([
    item.clasifica1,
    item.clasifica2,
    item.clasifica3,
    item.clasifica4,
    item.clasifica5,
  ])

  const handleClasificacionChange = (index: number, value: number) => {
    const newClasificaciones = [...clasificaciones]
    newClasificaciones[index] = value
    setClasificaciones(newClasificaciones)
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('id', item.id.toString())
    formData.append('correcta', correcta)
    formData.append('clasifica1', clasificaciones[0].toString())
    formData.append('clasifica2', clasificaciones[1].toString())
    formData.append('clasifica3', clasificaciones[2].toString())
    formData.append('clasifica4', clasificaciones[3].toString())
    formData.append('clasifica5', clasificaciones[4].toString())
    const r = await updateQuestion(formData)
    if (!r.isError) {
      notify(item.id.toString())
    } else {
      notify(item.id.toString())
    }
  }

  return (
    <div className="collapse bg-base-200 text-sm">
      <input type="checkbox" />
      <div className="collapse-title font-medium">Editar:</div>
      <div className="collapse-content">
        <div className="flex flex-col">
          <label id="correcta">
            Correcta
            <input
              id="correcta"
              className="m-1 p-1 w-40 text-center"
              type="string"
              value={correcta}
              onChange={(event) => setCorrecta(event?.currentTarget.value)}
            />
          </label>
          {clasificaciones.map((clasificacion, index) => (
            <div key={`clasifica${index + 1}`}>
              <label id={`clasifica${index + 1}`}>
                Clasifica {index + 1}
                <select
                  id={`clasifica${index + 1}`}
                  className="leading-none m-1 p-1 w-40 text-center"
                  value={clasificacion}
                  onChange={(event) =>
                    handleClasificacionChange(
                      index,
                      Number(event?.currentTarget.value),
                    )
                  }
                >
                  {temas.map((tema, temaIndex) => (
                    <option
                      key={`tema-${tema}-${temaIndex.toString()}`}
                      value={temaIndex}
                    >
                      {tema.titulo}
                    </option>
                  ))}
                </select>
                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                {temas[(item as any)[`clasifica${Number(index) + 1}`]].titulo}
              </label>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-accent btn-sm w-24"
            onClick={handleUpdate}
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  )
}
