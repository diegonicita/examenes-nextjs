'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import { refreshAction } from '@/app/(pages)/consults-server/actions/refresh'

const initialState = {}

export const checkCookie = () => {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(refreshAction, initialState)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    formAction()
    console.log("form action refresh")
  }, [])

  const name = Cookies.get('auth')
  typeof window !== 'undefined'
  return null
}

export default checkCookie
