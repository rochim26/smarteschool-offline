import Skeleton from "react-loading-skeleton";

const PublikasiHomePageSkeleton = () => {
  return (
    <div className="mb-5">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <Skeleton width={200} height={30} className="d-block" />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Skeleton width={200} height={30} />
        <Skeleton width={100} height={30} />
      </div>
      <Skeleton width="100%" height={30} className="mt-3" count={3} />
    </div>
  )
}

export default PublikasiHomePageSkeleton