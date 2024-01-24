export default function UserComments() {
  return (
    <section className="grid grid-cols-[40px,1fr] mt-5 ">
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
              <h1 className="text-sm ">Ever Rojas</h1>
            </div>
            <h2 className="text-sm">5min</h2>
            <h3 className="text-sm ">...</h3>
          </div>
          <div className="">
            <p>this is the most famous comment in examens</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 ml-2 mt-2">
          <span>que opinas</span>
          <span>respuesta</span>
        </div>
      </main>
    </section>
  );
}
