//@ts-ignore
import { useFormState } from 'react-dom'
import { insertAction } from '@/app/(pages)/consults-server/actions/insert'
import { useEffect, useState, useRef } from 'react'
import { type ConsultType } from '@/app/models/Consult'

const initialState = {
  fullname: '',
  email: '',
  consult: '',
  message: '',
} as ConsultType

export const useForm = () => {
  const [state, formAction] = useFormState(insertAction, initialState)
  const [counter, setCounter] = useState(0)
  const [disableForm, setDisableForm] = useState(false)
  const [status, setStatus] = useState('idle')
  const fullnameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const consultRef = useRef<HTMLTextAreaElement>(null)
  const messageRef = useRef<string | null>()

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    consult: '',
  })

  useEffect(() => {
    setCounter(counter + 1)
    messageRef.current = state.message
  }, [state])

  useEffect(() => {
    setDisableForm(true)
    let objMessage: { success: any; error: any } | null = null
    if (messageRef.current && messageRef.current !== null) {
      try {
        objMessage = JSON.parse(messageRef.current)
        // Iterar sobre los problemas
        const newErrors = { fullname: '', email: '', consult: '' }
        let status = 'success'
        objMessage?.error?.issues.forEach(
          (issue: { path: string | string[]; message: any }) => {
            if (issue.path.includes('fullname')) {
              newErrors.fullname = issue.message
              status = 'error'
            }
            if (issue.path.includes('email')) {
              newErrors.email = issue.message
              status = 'error'
            }
            if (issue.path.includes('consult')) {
              newErrors.consult = issue.message
              status = 'error'
            }
          },
        )
        setErrors({ ...errors, ...newErrors })
        setStatus(status)
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    } else {
      setErrors({ fullname: '', email: '', consult: '' })
    }
    let timer = setTimeout(() => {
      if (objMessage?.success) {
        if (fullnameRef && fullnameRef.current) fullnameRef.current.value = ''
        if (emailRef && emailRef.current) emailRef.current.value = ''
        if (consultRef && consultRef.current) consultRef.current.value = ''
        messageRef.current = null
      }
      messageRef.current = null
      setDisableForm(false)
      setStatus("idle")
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [counter])

  return {
    formAction,
    isFormDisabled: disableForm,
    errors,
    setErrors,
    ref: {
      fullname: fullnameRef,
      email: emailRef,
      consult: consultRef,
      message: messageRef,
    },
    status,
  }
}
