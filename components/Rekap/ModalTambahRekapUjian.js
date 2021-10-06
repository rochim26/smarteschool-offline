import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import daftarUjian from "../../data/tipe-ujian.json";

const ModalTambahRekapUjian = ({
  handleChangeForm,
  handleChangeSelect,
  formData,
  _postRekap,
  dataUjian,
  editData,
}) => {
  const isUAS = dataUjian?.findIndex((d) => d?.teknik == "UAS");
  const isUTS = dataUjian?.findIndex((d) => d?.teknik == "UTS");
  const isUS = dataUjian?.findIndex((d) => d?.teknik == "US");
  return (
    <>
      <NewModal
        modalId="modalTambahMateriRekap"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Judul Materi</h4>
            {/* <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan yang diberikan untuk siswa
            </span> */}
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Ujian</label>
              <SelectShared
                name="jenis"
                handleChangeSelect={handleChangeSelect}
                value={formData.jenis}
                options={daftarUjian.filter((tipe) => {
                  if (tipe.value.includes("UAS")) {
                    return isUAS < 0 ? true : false;
                  } else if (tipe.value.includes("UTS")) {
                    return isUTS < 0 ? true : false;
                  } else if (tipe.value.includes("US")) {
                    return isUS < 0 ? true : false;
                  } else {
                    return true;
                  }
                })}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Judul</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Judul Materi"
                minRows={3}
                name="judul"
                value={formData.judul}
                onChange={handleChangeForm}
              />
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
            onClick={() => _postRekap()}
          />
        }
      />
    </>
  );
};

export default ModalTambahRekapUjian;
