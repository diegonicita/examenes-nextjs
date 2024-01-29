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
      <label htmlFor={data.id} className="label">
        <span className="label-text">{data.text}</span>
      </label>
      <input
        type={data.type}
        placeholder={data.placeholder}
        className="input input-bordered"
        name={data.name}
        id={data.id}
        autoComplete="off"
        onBlur={handleBlur}
      />
      <div className="relative pb-5">
        {data.error && (
          <div className="absolute h-2 text-error text-xs font-bold text-start pt-1 px-2">
            {data.error}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
