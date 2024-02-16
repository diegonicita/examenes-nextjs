import CardProgress from '@/app/components/cards/cardProgress'
import CardStat from '@/app/components/cards/cardStat'
import getQuestionsStatistics from '@/app/server-actions/questions/get-questions-statistics'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import type { ExamType } from '@/app/models/Exam'
import type { UserType } from '@/app/models/User'

function capitalizeFirstLetters(name: string) {
  var words = name.split(' ')
  for (var i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
  }
  var capitalizedName = words.join(' ')
  return capitalizedName
}

const Page = async () => {
  const data = await getQuestionsStatistics()
  const exams = data.examenes as ExamType[]
  const payload = (await getInfoAuthCookie()) as UserType

  return (
    <div className="flex flex-col items-center mt-4 justify-center">
      <h1> Tu Progreso </h1>
      <h1>
        {payload?.username
          ? capitalizeFirstLetters(payload?.username)
          : '(no estás logueado)'}
      </h1>
      <div className="divider divider-start"></div>
      <div className="p-2 rounded">
        <CardStat userId={payload?.id} />
      </div>
      <div className="divider"></div>
      <h1> Tus Exámenes</h1>
      <h1 className="mb-2">
        {payload?.username
          ? capitalizeFirstLetters(payload?.username)
          : '(no estás logueado)'}
      </h1>
      <div className="flex flex-wrap justify-center px-8 max-w-[60rem] mx-auto mt-2 mb-8 gap-4">
        {exams &&
          exams.map((p, index: number) => (
            <CardProgress
              item={p}
              key={index}
              year={undefined}
              link={`/exams/${p.id}`}
              total={p.total}
              userId={payload?.id}
            />
          ))}
      </div>
      <div className="divider divider-end"></div>
    </div>
  )
}

export const metadata = {
  title: 'Resumen de tus avances',
}

export default Page
