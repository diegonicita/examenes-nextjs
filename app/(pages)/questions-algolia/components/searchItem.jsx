import React from 'react'
import Link from 'next/link'
import imgsrc from '@/app/assets/test-icon.jpeg'
import Image from 'next/image'

const SearchItem = ({ id, texto }) => {
  return (
    <>
      <Link href={`/detail/${id}`}>
        <div className="hover:bg-blue-300 flex gap-2 p-2">
          <Image
            src={imgsrc}
            alt={'icono de un examen'}
            className="w-8 h-8 object-contain"
          />
          <div>
            <h3 className="text-[0.8rem] font-semibold">{texto.substring(0,75) + '...'}</h3>
            <p className="text-[0.5rem] text-gray-600">Pregunta Medicina 2023</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default SearchItem
