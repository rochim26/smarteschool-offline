import { useState } from "react";
import { hideModal } from "../../../utilities/ModalUtils";
import SoalEsai from "./SoalEsai";
import SoalInfo from "./SoalInfo";
import SoalMenjodohkan from "./SoalMenjodohkan";
import SoalPg from "./SoalPg";
import SoalPgKompleks from "./SoalPgKompleks";
import SoalUraian from "./SoalUraian";

const ModalPratinjauSoal = ({
  ujianData = [],
  modalId = "",
  withRightLabel = true,
}) => {
  const [idxSoal, setIdxSoal] = useState(0);
  const activeSoalUjian = ujianData?.[idxSoal];
  const tipeSoal = activeSoalUjian?.soal?.bentuk || activeSoalUjian?.bentuk;

  const handlePrev = () => {
    if (idxSoal === 0) return;

    setIdxSoal(idxSoal - 1);
  };

  const handleNext = () => {
    if (ujianData?.length - 1 === idxSoal) return;

    setIdxSoal(idxSoal + 1);
  };

  return (
    <div
      className="modal modal-ss fade"
      id={`${modalId ? modalId : "modalPratinjauSoal"}`}
      tabIndex="-1"
      aria-labelledby="modalPratinjauSoalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title" id="modalPratinjauSoalLabel">
              <h4 className="mb-0 fw-extrabold">Pratinjau Bank Soal</h4>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() =>
                hideModal(modalId ? modalId : "modalPratinjauSoal")
              }
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <SoalInfo
              ujianData={ujianData}
              activeSoalUjian={activeSoalUjian}
              idxSoal={idxSoal}
              tipeSoal={tipeSoal}
              withRightLabel={withRightLabel}
            />
            <hr className="d-md-none hr-ss" />

            {tipeSoal === "pg" && <SoalPg activeSoalUjian={activeSoalUjian} />}
            {tipeSoal === "esai" && (
              <SoalEsai activeSoalUjian={activeSoalUjian} />
            )}
            {tipeSoal === "uraian" && <SoalUraian />}
            {tipeSoal === "pg_kompleks" && <SoalPgKompleks />}
            {tipeSoal === "mejodohkan" && <SoalMenjodohkan />}
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-secondary me-sm-3 me-2 px-sm-5 px-4"
              disabled={idxSoal === 0}
              onClick={handlePrev}
            >
              Sebelumnya
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-sm-3 ms-1 px-sm-5 px-4"
              disabled={ujianData?.length - 1 === idxSoal}
              onClick={handleNext}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPratinjauSoal;
