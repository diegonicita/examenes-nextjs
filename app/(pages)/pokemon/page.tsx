import Pokemon from '@/app/components/pokemon'

export default function PokemonPage() {
  return (
    <div className="flex flex-col items-center px-8 max-w-[60rem] mx-auto mt-8">
      <Pokemon />
    </div>
  )
}

export const metadata = {
  title: 'Pokemon',
}
