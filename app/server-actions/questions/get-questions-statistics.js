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
        image: null,
        total: 0,
      },
      {
        id: 1,
        titulo: 'ENARM',
        descripcion: '',
        pais: 'México',
        imagen: null,
        total: 0,
      },
      {
        id: 2,
        titulo: 'MIR',
        descripcion: '',
        pais: 'España',
        imagen: null,
        total: 0,
      },
      {
        id: 3,
        titulo: 'Examen Pediátrico',
        descripcion: '',
        pais: 'Argentina',
        imagen: null,
        total: 0,
      },
      {
        id: 4,
        titulo: 'Examen Prov. Buenos Aires',
        descripcion: '',
        pais: 'Argentina',
        imagen: null,
        total: 0,
      },
      {
        id: 5,
        titulo: 'Examen Único',
        descripcion: '',
        pais: 'Argentina',
        imagen: null,
        total: 0,
      },
      {
        id: 6,
        titulo: 'Examen Único',
        descripcion: '',
        pais: 'Perú',
        imagen: null,
        total: 0,
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

  respuesta.temas.push(...arrayFinal)

  // respuesta.estadisticas.push(...result4)

  return respuesta
}
