'use client'
import React, { useEffect } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { insertAction } from './insertAction'

const initialState = {
  message: '',
}

export default function createProduct() {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(insertAction, initialState)

  useEffect(() => {
    if (initialState.message === 'Nuevo Producto Creado Exitosamente...') {
      formAction.set(initialState)
    }
  }, [initialState.message])

  return (
    <div className="container mx-auto my-8 p-4 max-w-[40rem] rounded-md">
      <h1 className="font-bold text-lg mb-2">Crear un Producto</h1>
      <form
        className="w-full bg-blue-200 rounded-md shadow-xl"
        name="productf"
        method="post"
        action={formAction}
      >
        <div className="flex flex-col mx-8">
          <label className="mt-4 font-bold mb-2" htmlFor="title">
            Titulo:
          </label>
          <input
            className="p-2 rounded-md"
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div className="flex flex-col mx-8">
          <label className="mt-2 font-bold mb-2" htmlFor="price">
            Precio:
          </label>
          <input
            className="p-2 rounded-md"
            type="text"
            id="price"
            name="price"
          />
        </div>
        <div className="flex flex-col mx-8">
          <label className="mt-2 font-bold mb-2" htmlFor="description">
            Descripcion:
          </label>
          <input
            className="p-2 rounded-md"
            type="text"
            id="description"
            name="description"
          />
        </div>
        <button
          name="insert"
          type="submit"
          className="btn btn-primary my-4 mx-8"
        >
          Submit
        </button>
        {state && (
          <div className="text-center py-2 badge badge-accent">
            {' '}
            {state.message}
          </div>
        )}
      </form>
    </div>
  )
}
