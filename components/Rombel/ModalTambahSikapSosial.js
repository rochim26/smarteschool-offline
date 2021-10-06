import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTambahSikapSosial = ({
  handleChangeFormCheck,
  formData,
  _postSikapSosial,
  sikapsosial,
}) => {
  return (
    <>
      <NewModal
        modalId="modalTambahSikapSosial"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tambah Sikap Sosial</h4>
            <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan ujian yang diberikan siswa
            </span>
          </>
        }
        content={
          <>
            <div className="mb-2">
              <h5 className="fw-bold color-dark fs-18-ss mb-4">
                Sikap yang sudah ditunjukkan
              </h5>
              <div className="row">
                {sikapsosial?.map((d, idx) => {
                  return (
                    <div className="col-md-4 col-6">
                      <div class="form-check mb-3">
                        <input
                          class="form-check-input"
                          name="mSikapSosialDitunjukkanId"
                          type="checkbox"
                          value={d?.id}
                          id={`sosial-ditunjukkan-${d?.id}`}
                          onChange={handleChangeFormCheck}
                          checked={
                            formData?.mSikapSosialDitunjukkanId?.findIndex(
                              (data) => data == d?.id
                            ) >= 0
                          }
                          disabled={
                            formData?.mSikapSosialDitingkatkanId?.findIndex(
                              (data) => data == d?.id
                            ) >= 0
                          }
                        />
                        <label
                          class="form-check-label fw-bold fs-14-ss color-secondary"
                          for={`sosial-ditunjukkan-${d?.id}`}
                        >
                          {d?.sikap}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-2">
              <h5 className="fw-bold color-dark fs-18-ss mb-4">
                Sikap yang perlu ditingkatkan
              </h5>
              <div className="row">
                {sikapsosial?.map((d, idx) => {
                  return (
                    <div className="col-md-4 col-6">
                      <div class="form-check mb-3">
                        <input
                          class="form-check-input"
                          name="mSikapSosialDitingkatkanId"
                          type="checkbox"
                          value={d?.id}
                          id={`sosial-ditingkatkan-${d?.id}`}
                          onChange={handleChangeFormCheck}
                          checked={
                            formData?.mSikapSosialDitingkatkanId?.findIndex(
                              (data) => data == d?.id
                            ) >= 0
                          }
                          disabled={
                            formData?.mSikapSosialDitunjukkanId?.findIndex(
                              (data) => data == d?.id
                            ) >= 0
                          }
                        />
                        <label
                          class="form-check-label fw-bold fs-14-ss color-secondary"
                          for={`sosial-ditingkatkan-${d?.id}`}
                        >
                          {d?.sikap}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
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
            onClick={() => _postSikapSosial()}
          />
        }
      />
    </>
  );
};

export default ModalTambahSikapSosial;
