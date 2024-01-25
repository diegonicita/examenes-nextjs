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
    error: string
  }
}

export const TextArea = ({ handleBlur, data }: Props) => {
  return (
    <div className="form-control">
      <label htmlFor={data.id} className="label">
        <span className="label-text">{data.text}</span>
      </label>
      <textarea
        placeholder={data.placeholder}
        className="h-36 input input-border py-2"
        name={data.name}
        id={data.id}
        autoComplete="off"
        onBlur={handleBlur}
      />
      <div className="relative pb-8">
        {data.error && (
          <div className="absolute h-2 text-error text-xs font-bold text-start pt-1 px-2">
            {data.error}
          </div>
        )}
      </div>
    </div>
  )
}

export default TextArea
