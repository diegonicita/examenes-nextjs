export type ExamTypeFromApi = {
  name: string
  questions: number
  id: number
  titulo: string
  descripcion: string
  pais: string
  imagen: string
  total: number
  visible: boolean
  preguntas: {
    ano: number
    cantidad_preguntas: number
  }[]
}

export type ExamTypeFromDB = {
  total: number
  id: number
  name: string
  questions: number
  image: string
  country: string
}
