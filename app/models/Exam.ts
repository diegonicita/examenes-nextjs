export type ExamType = {
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
