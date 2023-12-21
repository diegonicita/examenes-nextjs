import ContentLoader from 'react-content-loader'

const HeadBodyGrid = () => (
  <div className="flex flex-wrap mt-8 justify-center max-w-[60rem] mx-auto">
    <ContentLoader height="200" width="900">
      <rect x="15" y="15" rx="4" ry="4" width="800" height="25" />
      <rect x="15" y="50" rx="2" ry="2" width="800" height="150" />
    </ContentLoader>
    <ContentLoader height="200" width="900">
      <rect x="15" y="15" rx="4" ry="4" width="800" height="25" />
      <rect x="15" y="50" rx="2" ry="2" width="800" height="150" />
    </ContentLoader>
  </div>
)

export default async function Loading() {
  return <HeadBodyGrid />
}
