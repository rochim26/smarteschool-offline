import Skeleton from "react-loading-skeleton";

const PesanSurelSkeleton = ({ count = 1 }) => {
  const skeleton = [];

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton");
  }

  return (
    <>
      {skeleton.map((skeleton, idx) => (
        <div className="col-md-12 mt-4">
          <div className="card card-ss px-4 py-3">
            <div className="d-flex justify-content-between mb-1">
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={70} />
            </div>
            <div>
              <Skeleton width={180} height={25} />
              <br />
              <Skeleton height={20} />
              <br />
              <Skeleton width={120} height={20} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PesanSurelSkeleton;
