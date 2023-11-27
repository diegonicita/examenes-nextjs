export default function SubmitButton({text}:{text:string}){
    return(
        <div className="flex flex-col items-center md:items-start mt-[28px] pb-7">
          <button
            type="submit"
            className="w-[182px] h-[62px]  bg-accent 
        rounded-md btn btn-accent text-accent-content text-center"
        // aria-disabled={pending}
       
          >
            {text}
          </button>
        </div>
    )
}