import React from 'react'

export const Avatar = ({ status }: { status: boolean }) => {
  return (
    <>
      {status && (
        <div className="avatar online">
          <div className="w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      )}
      {!status && (
        <div className="avatar offline">
          <div className="w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      )}
    </>
  )
}

export default Avatar
