import { ReactNode } from 'react'

export const Container = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) => {
  return (
    <div className="mx-auto max-w-[55rem] mb-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-bold text-3xl">{title}</h1>
        <span>{subtitle}</span>
      </div>
      {children}
    </div>
  )
}

export default Container
