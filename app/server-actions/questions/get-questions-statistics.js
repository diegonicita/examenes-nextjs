'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'

export default async function getQuestionsStatistics() {
  const respuesta = {
    total: 0,
    examenes: [
      {
        id: 0,
        titulo: 'Examen Municipal',
        descripcion: '',
        pais: 'Argentina',
        imagen: 'medicina-5.png',
        total: 0,
        visible: true,
      },
      {
        id: 1,
        titulo: 'ENARM',
        descripcion: '',
        pais: 'México',
        imagen: 'medicina-5.png',
        total: 0,
        visible: true,
      },
      {
        id: 2,
        titulo: 'MIR',
        descripcion: '',
        pais: 'España',
        imagen: 'medicina-5.png',
        total: 0,
        visible: true,
      },
      {
        id: 3,
        titulo: 'Examen Pediátrico',
        descripcion: '',
        pais: 'Argentina',
        imagen: 'medicina-5.png',
        total: 0,
        visible: true,
      },
      {
        id: 4,
        titulo: 'Examen Prov. Buenos Aires',
        descripcion: '',
        pais: 'Argentina',
        imagen: 'medicina-5.png',
        total: 0,
        visible: true,
      },
      {
        id: 5,
        titulo: 'Examen Único',
        descripcion: '',
        pais: 'Perú',
        imagen: 'medicina-5.png',
        total: 0,
        visible: true,
      },
      {
        id: 6,
        titulo: 'Examen Único',
        descripcion: '',
        pais: 'Argentina',
        imagen: 'medicina-5.png',
        total: 0,
        visible: true,
      },
    ],
    temas: [],
  }

  const result1 = await executeQuery(
    'select count(*) as total from preguntas',
    [],
  )

  respuesta.total = result1[0].total

  for (let i = 0; i < 7; i++) {
    const result2 = await executeQuery(
      'select count(*) as total from preguntas where examen = ?',
      [i],
    )
    if (result2 != undefined) respuesta.examenes[i].total = result2[0].total
  }

  const result3 = await executeQuery('select * from clasificaciones', [])

  const result4 = await executeQuery(
    'SELECT id, COUNT(*) as total FROM (SELECT clasifica1 as id FROM preguntas WHERE clasifica1 BETWEEN 1 AND 45 UNION ALL SELECT clasifica2 FROM preguntas WHERE clasifica2 BETWEEN 1 AND 45 UNION ALL SELECT clasifica3 FROM preguntas WHERE clasifica3 BETWEEN 1 AND 45 UNION ALL SELECT clasifica4 FROM preguntas WHERE clasifica4 BETWEEN 1 AND 45 UNION ALL SELECT clasifica5 FROM preguntas WHERE clasifica5 BETWEEN 1 AND 41) AS subconsulta GROUP BY id ORDER BY id;',
  )

  // Unir los arrays de objetos basándose en el ID
  let arrayFinal = result3.map((obj1) => {
    let obj2 = result4.find((obj2) => obj2.id === obj1.id)
    return { ...obj1, ...obj2 }
  })

  const result5 = await executeQuery(
    'SELECT ano, examen, COUNT(*) as cantidad_preguntas FROM preguntas GROUP BY examen, ano',
  )

  console.log(result5)

  // Agrupa los resultados por examen en un array de objetos
  const preguntasPorExamen = result5.reduce((acc, result) => {
    const examenId = result.examen
    const objetoExamen = acc.find((obj) => obj.id === examenId)

    if (objetoExamen) {
      objetoExamen.preguntas.push({
        ano: result.ano,
        cantidad_preguntas: result.cantidad_preguntas,
      })
    } else {
      acc.push({
        id: examenId,
        preguntas: [
          {
            ano: result.ano,
            cantidad_preguntas: result.cantidad_preguntas,
          },
        ],
      })
    }

    return acc
  }, [])

  respuesta.temas.push(...arrayFinal)

  // Combina la información de preguntas en los objetos de examenes
  const examenesConPreguntas = respuesta.examenes.map((examen) => {
    const preguntasExamen = preguntasPorExamen.find((p) => p.id === examen.id)

    return {
      ...examen,
      preguntas: preguntasExamen ? preguntasExamen.preguntas : [],
    }
  })

  console.log(examenesConPreguntas)

  respuesta.examenes = examenesConPreguntas

  return respuesta
}
