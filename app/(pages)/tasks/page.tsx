import { pending, done } from './tasks'
export default function counterPage() {
  return (
    <div className="grid grid-cols-2 items-start p-4">
      <div className="p-4 justify-self-end">
      <div className="font-bold pb-2">TODO:</div>
        <ul>
          {pending.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="p-4 justify-self-start">
        <div className="font-bold pb-2">DONE:</div>
        <ul>
          {done.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Tareas',
}
