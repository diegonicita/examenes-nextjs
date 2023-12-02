'use client'

import { useState, useEffect } from 'react'
import { useLogin } from './useLogin'
import { Modal } from './modal'
import { selectToken, useSelector } from '@/app/lib/redux'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('diego1@gmail.com')
  const [password, setPassword] = useState('12345678')
  const { handleSubmitLogin, loginResponse } = useLogin()
  const [showModal, setShowModal] = useState(false)
  const token = useSelector(selectToken)
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push('/')
    }
  }, [token, router])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    handleSubmitLogin(data)
    setShowModal(true)
  }

  return (
    <>
      {!token && (
        <div className="mt-8 hero-content mx-auto max-w-sm">
          <Modal
            showModal={showModal}
            handleShowModal={setShowModal}
            respObject={loginResponse}
          />
          {!showModal && (
            <div className="flex flex-col justify-stretch items-stretch gap-4">
              <form onSubmit={handleSubmit} className="card w-full bg-base-300">
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ingresa tu email"
                      className="input input-bordered"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      className="input input-bordered"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Ingresar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  )
}
