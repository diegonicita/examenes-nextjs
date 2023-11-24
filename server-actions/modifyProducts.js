'use client'
import React from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { insertAction } from './insertAction'

const initialState = {
  message: null,
}

export default function modifyProducts() {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(insertAction, initialState)

  return (
    <div className="container bg-red-100 text-center mx-auto py-4">
      <h1>Create Product</h1>
      <form name="productf" method="post" action={formAction}>
        <div className="mb-3">
          <label htmlFor="title">
            Title
          </label>
          <input type="text" id="title" name="title" />
        </div>
        <div className="mb-3">
          <label htmlFor="price">
            Price
          </label>
          <input type="text" id="price" name="price" />
        </div>
        <div className="mb-3">
          <label htmlFor="description">
            Description
          </label>
          <input type="text" id="description" name="description" />
        </div>
        <button name="insert" type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
