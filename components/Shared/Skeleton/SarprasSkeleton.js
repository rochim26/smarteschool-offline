import Skeleton from "react-loading-skeleton";

const SarprasSkeleton = () => {
  return (
    <div className="p-3">
      <Skeleton width={200} height={30} className="d-block mb-2" />
      <Skeleton width="100%" height={250} />
      <hr className="my-3" />
      <div className="d-flex align-items-center justify-content-between">
        <Skeleton width={150} height={30} />
        <Skeleton width={100} height={30} />
      </div>
      <Skeleton width="100%" height={30} className="mt-3" />
    </div>
  )
}

export default SarprasSkeleton