'use client'
import { useEffect } from 'react'
import createNews from './action/createNew/createNew'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import { notifySuccess } from '@/app/components/form/components/notifySuccess'
import { notifyErrors } from '@/app/components/form/components/notifyErrors'
const initialState = {
  message: '',
}
export default function CreatenewForm() {
  const [state, formAction] = useFormState(createNews, initialState)
  console.log(state)
  useEffect(() => {
    if (state?.message === 'success') {
      notifySuccess('Tu Noticia ha sido Creada exitosamente')
    } else {
      if (state?.message === 'error') {
        notifyErrors('No pudimos crear tu noticia, Inténtalo más tarde.')
      }
    }
  }, [state?.message])

  return (
    <section className=''>
      <form action={formAction} className='flex flex-col items-center gap-y-3'>
        <input
          name='title'
          type='text'
          placeholder='Title here'
          className='input input-bordered input-accent w-full max-w-xs'
        />
        <input
          name='description'
          type='text'
          placeholder='Description here'
          className='input input-bordered input-accent w-full max-w-xs'
        />
        <input
          name='url_news'
          type='url'
          placeholder='url new here'
          className='input input-bordered input-accent w-full max-w-xs'
        />
        <input
          name='url_image'
          type='url'
          placeholder='image here'
          className='input input-bordered input-accent w-full max-w-xs'
        />
        <button type='submit' className='btn btn-active btn-accent'>
          Crear noticia
        </button>
      </form>
    </section>
  )
}
