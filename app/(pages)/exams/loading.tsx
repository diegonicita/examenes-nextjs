const Card = () => (
  <div className="p-84 flex flex-col gap-4 h-72 w-56">
    <div className="skeleton h-8 w-48 mx-auto mt-8" />
    <div className="skeleton h-56 w-48 mx-auto" />
    <div className="skeleton h-8 w-48 mx-auto" />
    <div className="skeleton h-12 w-36 mx-auto mb-8" />
  </div>
)

const HeadBodyGrid = () => (
  <div className="flex flex-wrap mt-12 justify-center max-w-[60rem] mx-auto">
    <div className="flex flex-col gap-2 items-center w-full">
      <div className="skeleton h-6 w-40" />
      <div className="skeleton h-4 w-20" />
      <div className="flex gap-4 mt-4 flex-wrap justify-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </div>
)

export default async function Loading() {
  return <HeadBodyGrid />
}
