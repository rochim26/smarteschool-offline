import Skeleton from "react-loading-skeleton";

const BukuIndukSkeleton = ({ count = 1 }) => {
  const skeleton = [];

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton");
  }

  return (
    <>
      <div className="row d-flex justify-content-between mt-4">
        {skeleton.map((skeleton, idx) => (
          <div className="col-md-4 mb-4">
            <div className="card card-ss px-4 py-3">
              <div className="mb-2">
                <Skeleton height={35} />
              </div>
              <div className="mb-2 mb-4">
                <Skeleton width={100} height={25} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BukuIndukSkeleton;
