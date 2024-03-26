'use client'
import Link from 'next/link'
const ButtonLogin = ({ isLogin }: { isLogin: boolean | null }) => {
  return (
    <>
      {!isLogin && (
        <Link
          href="/login"
          className="btn btn-neutral text-neutral-content w-48 justify-center 
         text-lg mb-8"
        >
          Ingresar
        </Link>
      )}
      {isLogin && (
        <div className="flex gap-2">
          <Link
            href="/exams"
            className="btn btn-neutral text-neutral-content w-34 justify-center 
         text-lg mb-8"
          >
            Ir a Examenes
          </Link>
          <Link
            href="/progress"
            className="btn btn-neutral text-neutral-content w-34 justify-center 
         text-lg mb-8"
          >
            Ver tu Progreso
          </Link>
        </div>
      )}
    </>
  )
}

export default ButtonLogin
