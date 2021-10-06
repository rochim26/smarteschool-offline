import Skeleton from "react-loading-skeleton";

const PostinganSkeleton = ({ count = 1 }) => {

  const skeleton = []

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton")
  }

  return skeleton.map((skeleton, idx) => (
    <div className="row d-flex align-items-center" key={idx}>
      <div className="col-md-6">
        <Skeleton width="100%" height={300} />
      </div>
      <div className="col-md-6">
        <Skeleton width={200} height={20} className="mb-2 d-block" />
        <Skeleton width={100} height={20} className="mb-2 d-block" />
        <Skeleton width={120} height={20} className="mt-3" />
        <div className="d-flex align-items-center">
          <Skeleton width={100} height={20} className="me-3" />
          <Skeleton width={36} height={36} circle className="me-3" />
          <Skeleton width={36} height={36} circle className="me-3" />
        </div>
      </div>
    </div>
  ))
};

export default PostinganSkeleton;
