export default function SubmitButtom({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="w-40 h-14 bg-accent rounded-md btn btn-accent text-accent-content text-center"
    >
      {text}
    </button>
  )
}
