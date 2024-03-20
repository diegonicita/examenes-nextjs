import Prices from '../home/components/plans/plans'
import Faq from '../home/components/faq/faq'

import React from 'react'

const Plans = async () => {
  return (
    <div className="mx-auto max-w-[55rem] mb-8 mt-8">
      <Prices />
      <Faq />
      <div className="flex flex-col gap-2 text-center mt-12 mb-0">
        <h1 className="font-bold text-3xl">Donaciones</h1>
        <span>
          Puedes donar dinero en Ko-Fi para nuestros gastos de desarrollo
        </span>
      </div>
      <div className="flex justify-center mt-4 mb-12">
        <a href="https://ko-fi.com/E1E6DPG1I" target="_blank">
          <img
            height="36"
            className="border-0 h-9"
            src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </div>
  )
}

export default Plans
