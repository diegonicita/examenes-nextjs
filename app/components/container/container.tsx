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
    <div className="mx-auto max-w-[70rem]">
      <div className="flex flex-col gap-2 text-center">
        <Title title={title} />
        <Subtitle subtitle={subtitle} />
      </div>
      {children}
    </div>
  )
}

export const Title = ({ title }: { title: string }) => (
  <h1 className="font-bold text-3xl">{title}</h1>
)

export const Subtitle = ({ subtitle }: { subtitle: string }) => (
  <h2 className="font-normal text-normal">{subtitle}</h2>
)

export const TitleSection = ({ title }: { title: string }) => (
  <h2 className="font-bold text-xl">{title}</h2>
)

export const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) => {
  return (
    <section className="mx-auto max-w-[70rem]">
      <div className="flex flex-col gap-2 text-center">
        <TitleSection title={title} />
        <Subtitle subtitle={subtitle} />
      </div>
      {children}
    </section>
  )
}

export default Container
