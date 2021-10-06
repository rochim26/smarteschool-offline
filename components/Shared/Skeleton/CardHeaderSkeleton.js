import Skeleton from "react-loading-skeleton";

const CardHeaderSkeleton = () => {
  return (
    <>
      <div className="row d-flex justify-content-start mt-4">
        <div className="col-md-1 me-4 ">
          <Skeleton width={69} height={69} circle className="ms-4" />
        </div>
        <div className="col-md-4 mb-4">
          <div className="mb-1">
            <Skeleton width={250} height={35} />
          </div>
          <div className="">
            <Skeleton width={100} height={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHeaderSkeleton;
