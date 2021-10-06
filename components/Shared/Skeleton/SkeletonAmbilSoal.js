import Skeleton from "react-loading-skeleton";

const SkeletonAmbilSoal = ({ count = 1 }) => {
  const skeleton = [];

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton");
  }

  return skeleton.map((skeleton, idx) => (
    <div className="kuis-component form-check-ss position-relative">
      <div className="kuis-card form-check-label rounded-ss mb-3 border border-secondary border-light-secondary-ss p-3 ">
        <div className="d-flex align-items-center justify-content-between">
          <Skeleton width={65} />
          <div className="d-flex">
            <Skeleton width={65} className="me-3" />
            <Skeleton width={65} />
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Skeleton width={45} height={45} circle />
            <Skeleton width={200} className="ms-3" />
          </div>
          <Skeleton width={45} height={45} circle />
        </div>
      </div>
    </div>
  ));
};

export default SkeletonAmbilSoal;
