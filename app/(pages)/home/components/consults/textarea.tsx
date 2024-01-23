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
    <>
      <label
        htmlFor="nombreyapellido"
        className="text-slate-800 text-base font-medium 
        font-inter leading-none pb-3"
      >
        {data.text}
      </label>
      <textarea
        placeholder={data.placeholder}
        className="h-36 px-4 py-4 bg-base rounded-md border border-base-300"
        name={data.name}
        id={data.id}
        autoComplete="off"
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

export default TextArea