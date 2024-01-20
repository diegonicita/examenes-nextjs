//@ts-ignore
import { useFormState } from 'react-dom'
import { insertAction } from '@/app/(pages)/consults/actions/insert'
import { useEffect, useState, useRef, RefObject } from 'react'
import getErrors from './getErrors'

type Status = 'idle' | 'success' | 'error'

type ObjMessage = { success: any; error: any } | null

export const useForm = (formRef: RefObject<HTMLFormElement>) => {
  const [state, formAction] = useFormState(insertAction, {
    message: '',
  })
  const [counter, setCounter] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
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
    let objMessage: ObjMessage = null
    if (messageRef.current && messageRef?.current !== null) {
      try {
        objMessage = JSON.parse(messageRef.current)
        const { newErrors, msg } = getErrors(objMessage)
        setErrors({ ...errors, ...newErrors })
        setStatus(msg)
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    } else {
      setErrors({ fullname: '', email: '', consult: '' })
    }
    let timer = setTimeout(() => {
      if (objMessage?.success) {
        formRef.current?.reset()
      }
      messageRef.current = null
      setStatus('idle')
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [counter])

  return {
    formAction,
    errors,
    setErrors,
    ref: {
      message: messageRef,
    },
    status,
  }
}
