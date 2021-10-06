import Skeleton from "react-loading-skeleton";

const CardKelasSkeleton = ({ count = 1 }) => {

  const skeleton = []

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton")
  }

  return skeleton.map((skeleton, idx) => (
    <div className="col-md-6" key={idx}>
      <div className="card-kelas-ss card card-ss px-0">
        <div className="card-body px-3 pt-3 d-flex align-items-start justify-content-between" style={{ background: "none" }}>
          <div>
            <Skeleton width={80} height={20} className="d-block mb-3" />
            <Skeleton width={120} height={20} className="d-block" />
          </div>
          <Skeleton width={36} height={36} circle />
        </div>
        <hr className="mt-0 mb-0" />
        <div className="card-footer card-footer-ss card-kelas-footer py-3 d-flex justify-content-between flex-lg-row flex-md-column flex-row align-items-lg-center">
          <div>
            <Skeleton width={60} height={20} className="me-3" />
            <Skeleton width={60} height={20} />
          </div>
          <div>
            <Skeleton width={80} height={20} />
          </div>
        </div>
      </div>
    </div>
  ))
};

export default CardKelasSkeleton;
