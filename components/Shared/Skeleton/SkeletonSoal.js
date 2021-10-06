import React from "react";
import Skeleton from "react-loading-skeleton";
import { alphabet } from "../../../utilities/HelperUtils";

const SkeletonSoal = () => {
  return (
    <div
      className="container ujian-content-container py-md-4 py-3"
      style={{ marginTop: "83px" }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="card card-ss p-4 mb-5">
            <div className="mb-2">
              <Skeleton height={30} />
            </div>
            <div className="mb-2">
              <Skeleton height={30} />
            </div>
            <div className="mb-4">
              <Skeleton height={30} width="70%" />
            </div>

            {[0, 1, 2, 3, 4].map((d, idx) => (
              <div key={idx} className="form-check-exam-ss">
                <input
                  className="form-check-input form-check-radio d-none"
                  type="radio"
                  name="flexRadioDefault"
                  id="skeletonJawaban"
                />
                <label
                  className="list-jawaban-soal form-check-label rounded-ss border px-4 py-3 d-flex align-items-center mb-3 pointer"
                  htmlFor="skeletonJawaban"
                >
                  <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">
                    {alphabet[idx]}
                  </h6>
                  <div className="konten-list-jawaban-soal flex-grow-1">
                    <Skeleton height={30} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSoal;
