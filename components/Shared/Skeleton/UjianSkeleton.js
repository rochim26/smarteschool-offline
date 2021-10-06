import Skeleton from "react-loading-skeleton";

const UjianSkeleton = () => {
  return (
    <div className="card-jadwal-ujian card card-ss bg-white rounded-ss p-4 pointer mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <Skeleton width={100} />
        <Skeleton width={30} />
      </div>
      <div className="mt-3">
        <Skeleton width={200} className="d-block mb-2" />
        <Skeleton width={50} className="d-block mb-2" />
        <Skeleton width={80} className="d-block" />
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="d-flex align-items-center">
          <Skeleton width={200} className="me-2" />
          <Skeleton width={50} className="me-2" />
          <Skeleton width={80} />
        </div>
        <Skeleton width={50} />
      </div>
    </div>
  );
};

export default UjianSkeleton;
