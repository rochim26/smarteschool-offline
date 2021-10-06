import Skeleton from "react-loading-skeleton";

const CardRPPSkeleton = ({ count = 1, isReadOnly }) => {
  const skeleton = [];

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton");
  }

  return (
    <>
      {isReadOnly && (
        <div className="row d-flex justify-content-between">
          {skeleton.map((skeleton, idx) => (
            <div className="col-lg-4 mb-lg-0 mb-4">
              <div className="card card-ss px-4 py-3">
                <div className="mb-5">
                  <Skeleton width={100} height={20} />
                </div>
                <div>
                  <Skeleton height={30} />
                </div>
                <div>
                  <Skeleton width={60} height={10} />
                </div>
                <div>
                  <Skeleton height={10} width={50} />
                  <Skeleton height={10} width={50} />
                  <Skeleton height={10} width={50} />
                </div>
                <div>
                  <Skeleton height={10} />
                  <Skeleton height={10} />
                </div>
                <hr className="w-100" />
                <div>
                  <Skeleton width={150} height={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isReadOnly && (
        <div className="row d-flex justify-content-between">
          {skeleton.map((skeleton, idx) => (
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="card card-ss px-4 py-3">
                <div className="mb-5">
                  <Skeleton width={100} height={20} />
                </div>
                <div>
                  <Skeleton height={30} />
                </div>
                <div>
                  <Skeleton width={60} height={10} />
                </div>
                <div>
                  <Skeleton height={10} width={50} />
                  <Skeleton height={10} width={50} />
                  <Skeleton height={10} width={50} />
                </div>
                <div>
                  <Skeleton height={10} />
                  <Skeleton height={10} />
                </div>
                <hr className="w-100" />
                <div>
                  <Skeleton width={150} height={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CardRPPSkeleton;
