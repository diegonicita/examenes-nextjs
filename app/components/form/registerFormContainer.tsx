'use client'
import React, { useRef, useState } from 'react'
import Form from './components/form'
import Buttom from './components/buttom'
import Input from './components/input'
import TextArea from './components/textarea'
// import {
//   checkFullValidation,
//   checkPartialValidation,
//   getErrorsFromResult,
// } from './consultFormValidation'
// import { consultFormAction } from './consultFormAction'

export const RegisterFormContainer = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: '',
    password2: '',
  })

  const handleSubmit = async (formData: FormData) => {
    // const result = checkFullValidation(formData)
    // const response = getErrorsFromResult(result)
    // setErrors({ ...errors, ...response })
    // consultFormAction({ result, formData, formRef })
  }

  const handleBlur = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    // const result = checkPartialValidation(
    //   new FormData(formRef.current as HTMLFormElement),
    //   {
    //     fullname: event.target.id === 'fullname' ? undefined : true,
    //     email: event.target.id === 'email' ? undefined : true,
    //     consult: event.target.id === 'consult' ? undefined : true,
    //   },
    // )
    // const response = getErrorsFromResult(result)
    // setErrors({ ...errors, ...response })
  }

  return (
    <div className="card w-full bg-base-300 mb-2">
      <Form handleSubmit={handleSubmit} formRef={formRef}>
        <Input
          data={{
            type: 'text',
            text: 'Usuario',
            placeholder: 'Crea tu nombre de usuario',
            id: 'fullname',
            name: 'fullname',
            error: errors.fullname,
          }}
          handleBlur={handleBlur}
        />
        <Input
          data={{
            type: 'text',
            text: 'Email',
            placeholder: 'Ingresa tu email',
            id: 'email',
            name: 'email',
            error: errors.email,
          }}
          handleBlur={handleBlur}
        />
        <Input
          data={{
            type: 'password',
            text: 'Password',
            placeholder: 'Ingresa tu contraseña',
            id: 'password',
            name: 'password',
            error: errors.password,
          }}
          handleBlur={handleBlur}
        />
        <Input
          data={{
            type: 'password',
            text: 'Repite tu contraseña',
            placeholder: 'Repite tu contraseña',
            id: 'password2',
            name: 'password2',
            error: errors.password2,
          }}
          handleBlur={handleBlur}
        />
        <Buttom text="Registrarse" textOnClick="...Espere..." />
      </Form>
    </div>
  )
}

export default RegisterFormContainer
