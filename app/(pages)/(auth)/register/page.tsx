'use client'

import { useState } from 'react'
import { useRegister } from './useRegister'
import { Modal } from './modal'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const { handleSubmitRegister, registerResponse } = useRegister()
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (password.length < 1) {
      alert('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (password !== password2) {
      alert('Las contraseñas no coinciden')
      return
    }
    const data = {
      username,
      email,
      password,
    }
    handleSubmitRegister(data)
    setShowModal(true)
  }

  return (
    <div className="mt-8 hero-content mx-auto max-w-sm">
      <Modal
        showModal={showModal}
        handleShowModal={setShowModal}
        respObject={registerResponse}
      />
      {!showModal && (
        <div className="flex flex-col justify-stretch items-stretch gap-4">
          <form onSubmit={handleSubmit} className="card w-full bg-base-300">
            <div className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Usuario</span>
                </label>
                <input
                  type="text"
                  placeholder="Crea tu nombre de usuario"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Repite tu Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Repite tu contraseña"
                  className="input input-bordered"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
