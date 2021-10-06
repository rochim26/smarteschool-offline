import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTambahSikapSpiritual = ({
  handleChangeFormCheck,
  formData,
  _postSikapSpiritual,
  sikapspiritual,
}) => {
  return (
    <>
      <NewModal
        modalId="modalTambahSikapSpiritual"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tambah Sikap Spiritual</h4>
            <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan ujian yang diberikan siswa
            </span>
          </>
        }
        content={
          <>
            <div className="mb-3">
              <h5 className="fw-bold color-dark fs-18-ss mb-4">
                Sikap yang sudah ditunjukkan
              </h5>
              {sikapspiritual?.map((d, idx) => {
                return (
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      name="mSikapSpiritualDitunjukkanId"
                      type="checkbox"
                      value={d?.id}
                      id={`ditunjukkan-${d?.id}`}
                      onChange={handleChangeFormCheck}
                      checked={
                        formData?.mSikapSpiritualDitunjukkanId?.findIndex(
                          (data) => data == d?.id
                        ) >= 0
                      }
                      disabled={
                        formData?.mSikapSpiritualDitingkatkanId?.findIndex(
                          (data) => data == d?.id
                        ) >= 0
                      }
                    />
                    <label
                      class="form-check-label fw-bold fs-14-ss color-secondary"
                      for={`ditunjukkan-${d?.id}`}
                    >
                      {d.sikap}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="mb-3">
              <h5 className="fw-bold color-dark fs-18-ss mb-4">
                Sikap yang perlu ditingkatkan
              </h5>
              {sikapspiritual?.map((d, idx) => {
                return (
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="mSikapSpiritualDitingkatkanId"
                      value={d?.id}
                      id={`ditingkatkan-${d?.id}`}
                      onChange={handleChangeFormCheck}
                      checked={
                        formData?.mSikapSpiritualDitingkatkanId?.findIndex(
                          (data) => data == d?.id
                        ) >= 0
                      }
                      disabled={
                        formData?.mSikapSpiritualDitunjukkanId?.findIndex(
                          (data) => data == d?.id
                        ) >= 0
                      }
                    />
                    <label
                      class="form-check-label fw-bold fs-14-ss color-secondary"
                      for={`ditingkatkan-${d?.id}`}
                    >
                      {d.sikap}
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.btnBio}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => _postSikapSpiritual()}
          />
        }
      />
    </>
  );
};

export default ModalTambahSikapSpiritual;
