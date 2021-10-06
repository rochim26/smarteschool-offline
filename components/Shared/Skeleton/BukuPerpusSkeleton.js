import Skeleton from "react-loading-skeleton";

const BukuPerpusSkeleton = ({ count = 1 }) => {

  const skeleton = []

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton")
  }

  return skeleton?.map((skeleton, idx) => (
    <div className="col-lg-3 col-md-6" key={idx}>
      <div className="card-buku-perpustakaan dropdown dropdown-ss position-relative">
        <div className="card card-ss pointer">
          <Skeleton
            width="100%"
            height={150}
          />
          <div className="card-body w-100 p-3">
            <Skeleton width={100} height={20} /> <br />
            <Skeleton width={80} height={20} className="mt-2" /> <br />
            <Skeleton width={200} height={20} className="mt-4" /> <br />
          </div>
          <div className="card-footer card-footer-ss w-100 p-0 pb-3">
            <hr className="mt-0 mb-3" />
            <div className="px-3 d-flex align-items-center w-100">
              <Skeleton width={50} height={50} circle className="me-3" />
              <div>
                <Skeleton width={120} height={20} /> <br />
                <Skeleton width={80} height={20} className="mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
};

export default BukuPerpusSkeleton;
