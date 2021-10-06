import { DatePicker } from "antd";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import { momentPackage } from "../../utilities/HelperUtils";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import agamaData from "../../data/agama.json";

const ModalTambahPkl = ({
  handleChangeForm,
  formData,
  _postKeteranganPkl,
  handleChangeSelect,
  handleChangeDate,
  industri,
}) => {
  const selectIndustri = industri?.map((data, idx) => {
    return {
      value: `${data?.industri?.nama}`,
      label: `${data?.industri?.nama}`,
    };
  });
  return (
    <>
      <NewModal
        modalId="modalTambahPkl"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Keterangan PKL</h4>
            <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan yang diberikan untuk siswa
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Mitra DU/DI</label>
              <SelectShared
                name="namamitra"
                placeholder="Pilih Mitra DU / DI"
                handleChangeSelect={handleChangeSelect}
                value={formData.namamitra}
                options={selectIndustri}
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label">Tanggal Mulai</label>
                <DatePicker
                  onChange={(date, dateString) =>
                    handleChangeDate(dateString, "tanggalMulai")
                  }
                  placeholder="Pilih tanggal"
                  className="form-control"
                  autoComplete="off"
                  value={
                    formData?.tanggalMulai &&
                    momentPackage(formData?.tanggalMulai)
                  }
                />
              </div>
              <div className="col-md-6 mb-4">
                <label className="form-label">Tanggal Selesai</label>
                <DatePicker
                  onChange={(date, dateString) =>
                    handleChangeDate(dateString, "tanggalSelesai")
                  }
                  placeholder="Pilih Tanggal"
                  className="form-control"
                  autoComplete="off"
                  value={
                    formData?.tanggalSelesai &&
                    momentPackage(formData?.tanggalSelesai)
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Keterangan</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Tuliskan keterangan selama PKL untuk siswa"
                minRows={3}
                name="keterangan"
                value={formData.keterangan}
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
            onClick={() => _postKeteranganPkl()}
          />
        }
      />
    </>
  );
};

export default ModalTambahPkl;
