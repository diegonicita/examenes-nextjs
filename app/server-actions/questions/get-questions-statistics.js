'use server'
import executeQuery from '@/app/server-actions/helpers/mysqldb'

const dynamic = 'force-dynamic'

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

  respuesta.temas.push(...result3)

  return respuesta
}
