"use client";


export default function Comments({children}:{children:React.ReactNode}) {
  return (
    
      <div className="flex flex-row w-full mt-2 ">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full mr-2">
            <img
              alt="profile"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div>{children}</div>
      </div>
    
  );
}
