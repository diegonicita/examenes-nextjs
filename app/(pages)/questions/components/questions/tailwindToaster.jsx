import { Toaster, resolveValue } from 'react-hot-toast'

export const TailwindToaster = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
      }}
    >
      {(t) => (
        <div className="text-center">
          <div className="alert alert-error">{resolveValue(t.message)}</div>
        </div>
      )}
    </Toaster>
  )
}
