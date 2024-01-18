import React from 'react'

export const Valorations = ({
  valorations,
  id_question,
}: {
  valorations: any
  id_question: number
}) => {
  return (
    <>
      {valorations && valorations[id_question] && (
        <div className="flex mb-2 pb-2 gap-3 -z-10 text-xs">
          <div>{'❤️ ' + valorations[id_question][0].cantidad}</div>
          <div>{'👍 ' + valorations[id_question][2].cantidad}</div>
          <div>{'👎 ' + valorations[id_question][1].cantidad}</div>
        </div>
      )}
    </>
  )
}

export default Valorations
