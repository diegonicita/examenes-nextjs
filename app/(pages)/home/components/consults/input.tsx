import React from 'react'

type Props = {
  handleFocus: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => void
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

export const Input = ({ handleFocus, handleBlur, data }: Props) => {
  return (
    <>
      <label
        htmlFor="nombreyapellido"
        className="text-slate-800 text-base font-medium 
        font-inter leading-none pb-3"
      >
        {data.text}
      </label>      
      <input
        type={data.type}
        placeholder={data.placeholder}
        className="h-16 px-4 py-4 bg-base rounded-md border border-base-300"
        name={data.name}
        id={data.id}
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="relative pb-8">
      {data.error && (
        <div className="absolute h-2 text-error font-bold text-start px-2">
          {data.error}
        </div>        
      )}
      </div>
    </>
  )
}

export default Input
