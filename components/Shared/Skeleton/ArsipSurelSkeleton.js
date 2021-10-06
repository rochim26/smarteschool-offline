import Skeleton from "react-loading-skeleton";

const ArsipSurelSkeleton = ({ count = 1 }) => {
  const skeleton = [];

  for (let i = 1; i <= count; i++) {
    skeleton.push("skeleton");
  }

  return (
    <>
      <div className="col-md-12 mb-4">
        <div className="card card-ss px-4 py-3 ">
          <Skeleton height={35} />
        </div>
      </div>
      <div className="col-md-12 ">
        <div className="row d-flex justify-content-between">
          {skeleton.map((skeleton, idx) => (
            <div className="col-md-3 mb-4">
              <div className="card card-ss px-4 py-3">
                <div className="d-flex justify-content-between mb-4">
                  <Skeleton height={50} width={50} />
                  <Skeleton height={40} width={10} />
                </div>
                <div>
                  <Skeleton width={130} height={25} />
                  <br />
                  <Skeleton width={100} height={10} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArsipSurelSkeleton;
