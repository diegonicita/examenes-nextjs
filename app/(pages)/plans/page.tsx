import Prices from '../home/components/plans/plans'
import Faq from '../home/components/faq/faq'

import React from 'react'

export const page = () => {
  return (
    <div className="mx-auto max-w-[55rem] mb-8 mt-8">
      <Prices />      
      <Faq />
    </div>
  )
}

export default page
