import Verify from '@/app/(pages)/verify/components/verify'
import Counter from '@/app/(pages)/verify/components/counter'

export default function VerifyPage() {
  return (
    <>
      <Counter />
      <Verify />
    </>
  )
}

export const metadata = {
  title: 'Redux Toolkit',
}
