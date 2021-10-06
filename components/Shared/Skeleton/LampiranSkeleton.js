import Skeleton from "react-loading-skeleton";

const LampiranSkeleton = ({ count = 1 }) => {

  const skeleton = []

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton")
  }

  return skeleton.map((skeleton, idx) => (
    <div className="card-lampiran-materi border-light-secondary rounded-ss mb-3 d-flex align-items-center justify-content-between mt-3" key={idx}>
      <div className="d-flex align-items-center">
        <Skeleton width={50} height={50} circle />
        <div className="ms-3">
          <Skeleton width={125} height={20} /> <br />
          <Skeleton width={75} height={20} />
        </div>
      </div>
      <div className="d-flex">
        <div className="me-2">
          <Skeleton width={75} height={20} />
        </div>
        <Skeleton width={20} height={20} />
      </div>
    </div>
  ))
};

export default LampiranSkeleton;
