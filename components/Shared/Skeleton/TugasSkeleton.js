import Skeleton from "react-loading-skeleton";

const TugasSkeleton = () => {
  return (
    <div className="col-md-10">
      <div className="card-ss py-3 px-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Skeleton width={50} height={50} circle />
            <div className="ms-3">
              <Skeleton width={200} height={20} /> <br />
              <Skeleton width={150} height={20} />
            </div>
          </div>
          <div>
            <Skeleton width={36} height={36} />
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center justify-content-between">
          <div>
            <Skeleton width={400} height={20} /> <br />
            <Skeleton width={300} height={20} /> <br />
          </div>
          <Skeleton width={200} height={70} />
        </div>
        <div className="divider mt-3 mb-3"></div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex">
            <Skeleton width={100} height={20} /> <br />{" "}
            <span className="me-3"></span>
            <Skeleton width={100} height={20} />
          </div>
          <Skeleton width={300} height={35} />
        </div>
      </div>
    </div>
  );
};

export default TugasSkeleton;
