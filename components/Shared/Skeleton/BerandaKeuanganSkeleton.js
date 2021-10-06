import Skeleton from "react-loading-skeleton";

const BerandaKeuanganSkeleton = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-5 mb-lg-0 mb-4">
          <div className="card card-ss px-4 py-3">
            <div className="d-flex justify-content-between mb-2 align-items-center">
              <Skeleton width={40} height={40} circle />
              <Skeleton width={100} height={30} />
            </div>
            <hr className="w-100" />
            <br />
            <div>
              <Skeleton height={40} />
            </div>
            <div className="my-1 d-flex justify-content-between">
              <Skeleton width={200} height={30} />
              <Skeleton width={100} height={30} />
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card card-ss px-4 py-3">
            <div className="mb-2">
              <Skeleton width={100} height={20} />
            </div>
            <div className="mb-2">
              <Skeleton height={50} />
            </div>
            <hr className="w-100" />
            <div className="my-1 d-flex justify-content-between">
              <Skeleton width={250} height={60} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BerandaKeuanganSkeleton;
