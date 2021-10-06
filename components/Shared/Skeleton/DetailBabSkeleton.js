import Skeleton from "react-loading-skeleton";
import LampiranSkeleton from "./LampiranSkeleton";

const DetailBabSkeleton = () => {
  return (
    <div className="card card-ss p-4">
      <div className="d-flex justify-content-between align-items-center">
        <Skeleton width={250} height={30} />
        <Skeleton width={100} height={30} /> 
      </div>
      <hr className="w-75" />
      <div className="mt-4">
        <Skeleton width={300} height={20} className="d-block mb-2" />
        <Skeleton width={250} height={20} className="d-block mb-2" /> 
        <Skeleton width={350} height={20} className="d-block" /> 
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <Skeleton width={250} height={20} />
        <div>
          <Skeleton width={100} height={30} className="me-3" />
          <Skeleton width={100} height={30} />  
        </div>
      </div>
      <LampiranSkeleton count={2} />
    </div>
  )
};

export default DetailBabSkeleton;
