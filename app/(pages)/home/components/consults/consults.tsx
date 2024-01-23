import LeftColumn from './leftColumn'
import Form from './form'

export default function Consultas() {
  return (
    <div className="mx-auto max-w-[55rem] mb-8">
      <div className="flex">
        <LeftColumn />
        <Form />
      </div>
    </div>
  )
}
