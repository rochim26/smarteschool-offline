import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";

const ModalTambahSikap = ({
  handleChangeFormCheck,
  handleChangeSelect,
  formData,
  _postSikap,
  sikapsosial,
  predikat,
}) => {
  const selectData = predikat?.map((item) => {
    return { value: item.id, label: item.predikat };
  });
  return (
    <>
      <NewModal
        modalId="modalTambahSikap"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tambah Sikap Sosial</h4>
            <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan sikap siswa
            </span>
          </>
        }
        content={
          <>
            <div className="mb-3">
              <label className="form-label">Predikat</label>
              <SelectShared
                name="mPredikatNilaiId"
                handleChangeSelect={handleChangeSelect}
                value={formData.mPredikatNilaiId}
                options={selectData}
              />
            </div>
            <div className="mb-3">
              <span className="fs-6 fw-normal">
                Anda tidak dapat memilih sikap yang sama
              </span>
              <h6 className="fs-18-ss fw-bold color-dark mb-3 mt-4">
                Pilih Sikap yang sudah ditunjukkan
              </h6>
              <div className="row">
                {sikapsosial?.map((d, idx) => (
                  <div className="col-lg-4 col-md-4 col-6">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={d?.id}
                        name="mSikapDitunjukkanId"
                        id={`ditunjukkan-${d?.id}`}
                        onChange={handleChangeFormCheck}
                        checked={
                          formData?.mSikapDitunjukkanId?.findIndex(
                            (data) => data == d?.id
                          ) >= 0
                        }
                        disabled={
                          formData?.mSikapDitingkatkanId?.findIndex(
                            (data) => data == d?.id
                          ) >= 0
                        }
                      />
                      <label
                        className="form-check-label fs-14-ss fw-semibold"
                        for={`ditunjukkan-${d?.id}`}
                      >
                        {d?.sikap}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">
                Pilih Sikap yang perlu ditingkatkan
              </h6>
              <div className="row">
                {sikapsosial?.map((d, idx) => (
                  <div className="col-lg-4 col-md-4 col-6">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={d?.id}
                        name="mSikapDitingkatkanId"
                        id={`ditingkatkan-${d?.id}`}
                        onChange={handleChangeFormCheck}
                        checked={
                          formData?.mSikapDitingkatkanId?.findIndex(
                            (data) => data == d?.id
                          ) >= 0
                        }
                        disabled={
                          formData?.mSikapDitunjukkanId?.findIndex(
                            (data) => data == d?.id
                          ) >= 0
                        }
                      />
                      <label
                        className="form-check-label fs-14-ss fw-semibold"
                        for={`ditingkatkan-${d?.id}`}
                      >
                        {d?.sikap}
                      </label>
                    </div>
                  </div>
                ))}
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
            onClick={() => _postSikap()}
          />
        }
      />
    </>
  );
};

export default ModalTambahSikap;
