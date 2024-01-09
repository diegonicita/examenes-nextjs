'use client'
import React from 'react'

const Pagination = () => {
  return (
    <div className="join w-full mx-auto justify-center gap-1 mb-4">
      <button className="join-item btn">«</button>
      <button className="join-item btn">1</button>
      <button className="join-item btn btn-active">2</button>
      <button className="join-item btn">3</button>
      <button className="join-item btn">4</button>
      <button className="join-item btn">»</button>
    </div>
  )
}

export default Pagination
