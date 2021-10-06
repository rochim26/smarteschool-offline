import Skeleton from "react-loading-skeleton";

const PembayaranSkeleton = ({ count = 1 }) => {
  const skeleton = [];

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton");
  }

  return (
    <>
      <div className="row d-flex justify-content-between">
        {skeleton.map((skeleton, idx) => (
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="card card-ss px-4 py-3">
              <div className="mb-2">
                <Skeleton width={100} height={30} />
              </div>
              <div className="mb-2">
                <Skeleton height={40} />
              </div>
              <div className="mb-2">
                <Skeleton height={25} width={50} className="me-2" />
                <Skeleton height={25} width={50} className="me-2" />
                <Skeleton height={25} width={50} className="me-2" />
              </div>
              <div>
                <Skeleton height={30} />
              </div>
              <hr className="w-100" />
              <div>
                <Skeleton width={200} height={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PembayaranSkeleton;
