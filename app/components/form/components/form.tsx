'use client'
import React, { useRef, useState } from 'react'

type Form = {
  title: string
  handleSubmit: () => void
  formRef: React.MutableRefObject<HTMLFormElement | null> | undefined
  children: React.ReactNode
}

export const Form = ({ title, handleSubmit, formRef, children }: Form) => {
  return (
    <form
      action={handleSubmit}
      name="formulario"
      className="card w-full bg-base-300 p-8"
      ref={formRef}
    >
      {title && (
        <h1 className="text-center md:text-left md:text-slate-700 text-xl md:text-2xl mb-6">
          {title}
        </h1>
      )}
      {children}
    </form>
  )
}

export default Form
