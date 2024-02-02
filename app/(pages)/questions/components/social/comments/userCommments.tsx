export default function UserComments({data, handleOpenReply}:{data:any,handleOpenReply:any}) {
  
  console.log(data)
    
    return (
      <section className="grid grid-cols-[40px,1fr] mt-5 pr-5">
        <>
        <div className="">
          <img
            alt="profile"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <main className="flex flex-col">
          <div className=" card w-full p-3  bg-gray-200 shadow-xl ml-2">
            <div className="flex flex-row">
              <div className="flex-grow">
                <h1 className="text-base font-bold">{data.comment?.user_name}</h1>
              </div>
              <h2 className="text-sm">5min</h2>
              <h3 className="text-sm ">...</h3>
            </div>
            <div className="">
              <p className="text-base">{data.comment?.comment_text}</p>
              
            </div>
          </div>
          <button  className="text-start ml-4 my-2.5"onClick={handleOpenReply}>responder</button>
          
        </main>
        </>
      </section>
    );
  }