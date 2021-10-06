import React from "react";
import Skeleton from "react-loading-skeleton";

const NavSkeleton = ({ totalMenu = 1 }) => {
  const makeArray = () => {
    let tmpArray = [];

    for (let i = 0; i < totalMenu; i++) {
      tmpArray.push(i);
    }

    return tmpArray;
  };

  return (
    <div className="d-flex">
      {makeArray().map((d) => {
        return (
          <div className="me-2">
            <Skeleton height={20} width={95} key={d} />
          </div>
        );
      })}
    </div>
  );
};

export default NavSkeleton;
