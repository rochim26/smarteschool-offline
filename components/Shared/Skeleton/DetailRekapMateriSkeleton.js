import Skeleton from "react-loading-skeleton";
import LampiranSkeleton from "./LampiranSkeleton";

const DetailRekapMateriSkeleton = () => {
  return (
    <>
      <div className="card card-ss p-4">
        <div>
          <Skeleton width={100} height={20} />
        </div>
        <hr className="w-100" />
        <div className="d-none mr-4 d-md-flex">
          <Skeleton width={80} height={80} circle className="me-3" />
          <div className="w-100">
            <div className="w-40" style={{ width: "40%" }}>
              <Skeleton height={40} />
            </div>
            <div className="w-25">
              <Skeleton height={25} />
            </div>
          </div>
        </div>

        <div className="d-flex mr-4 d-md-none">
          <Skeleton width={60} height={60} circle className="me-3" />
          <div className="w-100">
            <div className="w-100">
              <Skeleton height={40} />
            </div>
            <div className="w-50">
              <Skeleton height={25} />
            </div>
          </div>
        </div>

        <div className="my-4">
          <Skeleton height={40} className="me-3" />
          <Skeleton height={20} className="me-3" />
          <Skeleton height={20} className="me-3" />
        </div>
      </div>
    </>
  );
};

export default DetailRekapMateriSkeleton;
