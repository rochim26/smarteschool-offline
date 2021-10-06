import Skeleton from "react-loading-skeleton";

const CardBabSkeleton = ({ count = 1 }) => {

  const skeleton = []

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton")
  }

  return (
    <div className="row">
      {
        skeleton.map((skeleton, idx) => (
          <div className="col-md-3 mt-3" key={idx}>
            <div className="card card-ss p-3">
              <div className="d-flex align-items-center justify-content-between">
                <Skeleton width={36} height={36} circle />
                <Skeleton width={50} height={15} />
              </div>
              <div className="mt-4 mb-5">
                <Skeleton width={200} height={20} className="d-block" />
                <Skeleton width={160} height={20} className="d-block mt-2" />
              </div>
            </div>
        </div>
        ))
      }
    </div>
  )
};

export default CardBabSkeleton;
