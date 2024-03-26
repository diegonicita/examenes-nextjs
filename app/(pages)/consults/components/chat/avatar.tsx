import React from 'react'

const AvatarImg = () => (
  <div className="w-8 rounded-full">
    <img
      alt="face"
      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
    />
  </div>
)

export const Avatar = ({ status }: { status: boolean }) => {
  return (
    <>
      <div className="flex gap-2 items-center text-xs">
        {status && (
          <>
            <div className="avatar online">
              <AvatarImg />
            </div>
            <div>On-line</div>
          </>
        )}
        {!status && (
          <>
            <div className="avatar offline">
              <AvatarImg />
            </div>
            <div>Off-line</div>
          </>
        )}
      </div>
    </>
  )
}

export default Avatar
