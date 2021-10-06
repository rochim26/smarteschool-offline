import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import { baseURL } from "../../client/clientAxios";
import { downloadMutasi } from "../../client/MutasiClient";
import { momentPackage } from "../../utilities/HelperUtils";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const initialFormData = {
  tanggalAwal: momentPackage(),
  tanggalAkhir: momentPackage()
}

const ModalDownloadMutasi = () => { 

  const [buttonState, setButtonState] = useState("idle");
  const [formData, setFormData] = useState(initialFormData);

  const handleChangeDate = (date, name) => {
    setFormData({
      ...formData,
      [name]: momentPackage(date)
    })
  }

  const handleSubmit = async () => {
    setButtonState("loading");
    const payload = { tanggalAwal: momentPackage(formData.tanggalAwal).format("YYYY-MM-DD"), tanggalAkhir: momentPackage(formData.tanggalAkhir).format("YYYY-MM-DD") }
    const { data } = await downloadMutasi(payload);

    if (data) {
      setButtonState("success");

      window.open(`${baseURL}/${data}`, "_blank");
      setFormData(initialFormData);
      // hideModal("ModalDownloadMutasi");
    } else {
      setButtonState("error")
    }
  }

  return (
    <>
      <NewModal
        modalId="ModalDownloadMutasi"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Download Mutasi</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk mendownload mutasi
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Tanggal Awal</label>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChangeDate(dateString, "tanggalAwal")
                }
                placeholder="Pilih tanggal"
                className="form-control"
                autoComplete="off"
                value={momentPackage(formData.tanggalAwal)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Tanggal Akhir</label>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChangeDate(dateString, "tanggalAkhir")
                }
                placeholder="Pilih tanggal"
                className="form-control"
                autoComplete="off"
                value={momentPackage(formData.tanggalAkhir)}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={buttonState}
            color={"primary"}
            idleText={"Download"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={handleSubmit}
          />
        }
      />
    </>
  );
};

export default ModalDownloadMutasi;
