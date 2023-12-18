'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
//@ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'

const initialState = {}

export const checkClientCookie = ({
  auth,
}: {
  auth: RequestCookie | undefined
}) => {
  const [state, formAction] = useFormState(refreshAction, initialState)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const newAuth = Cookies.get('auth')
    setIsClient(true)
    if (newAuth !== auth?.value) {
      formAction()
      console.log('form action refresh')
    }
  }, [])

  typeof window !== 'undefined'
  return null
}

export default checkClientCookie
