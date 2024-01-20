type Status = 'idle' | 'success' | 'error'
type ObjMessage = { success: any; error: any } | null

export const getErrors = (objMessage: ObjMessage) => {
  const newErrors = { fullname: '', email: '', consult: '' }
  let msg: Status = 'success'
  objMessage?.error?.issues.forEach(
    (issue: { path: string | string[]; message: any }) => {
      if (issue.path.includes('fullname')) {
        newErrors.fullname = issue.message
        msg = 'error'
      }
      if (issue.path.includes('email')) {
        newErrors.email = issue.message
        msg = 'error'
      }
      if (issue.path.includes('consult')) {
        newErrors.consult = issue.message
        msg = 'error'
      }
    },
  )
  return { newErrors, msg }
}

export default getErrors
