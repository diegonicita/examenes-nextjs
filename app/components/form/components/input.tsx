import React from 'react'

type Props = {
  handleBlur: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => void
  data: {
    text: string
    placeholder: string
    name: string
    id: string
    type: string
    error: string    
  }
}

export const Input = ({ handleBlur, data }: Props) => {
  return (
    <div className="form-control">
      <label htmlFor={data.id} className="label py-0">
        <span className="label-text">{data.text}</span>
      </label>
      <input
        type={data.type}
        placeholder={data.placeholder}
        className="input input-bordered mt-0"
        name={data.name}
        id={data.id}
        autoComplete="off"
        onBlur={handleBlur}
      />
      <div className="relative mb-4">
        {data.error && (
          <div className="absolute text-error text-xs font-bold pt-0 px-1">
            {data.error}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
