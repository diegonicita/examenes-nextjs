import Question from '@/app/(pages)/question/components/question'
import { cookies } from 'next/headers'
import CheckCookie from '@/app/components/checkCookie/checkCookie'
import { refreshAction } from '@/app/(pages)/consults-server/actions/refresh'

export default function QuestionPage() {
  
  const auth = cookies().get('auth') 
  if (!auth) {
    const formData = new FormData()
    formData.append('auth', 'false')    
    refreshAction(formData)
    console.log('refresh desde question')
  }

  return (
    <>
      <CheckCookie />
      {auth && auth?.value && (
        <div className="flex flex-col items-start px-8 max-w-[60rem] mx-auto mt-8">
          <Question />
        </div>
      )}
      {!auth && (
        <div className="flex flex-wrap justify-center px-8 max-w-[90rem] mx-auto mt-8">
          <div className="card max-w-[40rem] bg-base-100 shadow-xl m-2 border border-black px-4">
            <div className="card-body gap-0 px-1 text-start">
              <h1 className="font-bold">
                No tienes permiso para ver esta sección
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const metadata = {
  title: 'Preguntas',
}
