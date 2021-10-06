import { DatePicker } from "antd";
import ReactiveButton from "reactive-button";
import moment from "moment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewModal from "../Shared/NewModal/NewModal";
import MultipleInputField from "../Shared/MultipleInputField/MultipleInputField";
import Editor from "../Shared/Editor/Editor";
import { momentPackage } from "../../utilities/HelperUtils";
import {
  editGelombangPPDB,
  postGelombangPPDB,
} from "../../client/GelombangPPDB";
import { hideModal } from "../../utilities/ModalUtils";
import { downloadMonev } from "../../client/JadwalMengajarClient";
import { baseURL } from "../../client/clientAxios";

const ModalMonev = ({ isEdit }) => {
  const initialFormData = {
    tanggalAwal: momentPackage().subtract(7, "days"),
    tanggalAkhir: momentPackage(),
    buttonState: "idle",
  };

  const [formData, setFormData] = useState(initialFormData);

  const _downloadMonev = async () => {
    setFormData({ ...formData, buttonState: "loading" });

    const payload = {
      tanggalAwal: momentPackage(formData.tanggalAwal).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      tanggalAkhir: momentPackage(formData.tanggalAkhir).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };

    const { data } = await downloadMonev(payload);

    if (data) {
      setFormData({ ...initialFormData, buttonState: "success" });
      hideModal("ModalMonev");
      window.open(`${baseURL}/${data}`);
    } else {
      setFormData({ ...formData, buttonState: "error" });
    }
  };

  function handleChangeDatePicker(date, dateString, name) {
    setFormData({
      ...formData,
      [name]: moment(date),
    });
  }

  return (
    <NewModal
      modalId="ModalMonev"
      modalSize="xl"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {isEdit ? "Ubah" : "Unduh"} Hasil Monitoring Evaluasi
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {isEdit ? "mengubah" : "mengunduh"}{" "}
            hasil monitoring evalusi
          </span>
        </>
      }
      content={
        <>
          <div className="mb-3">
            <label className="form-label">Tanggal Awal</label>
            <DatePicker
              className="form-control"
              autoComplete="off"
              value={formData?.tanggalAwal}
              placeholder="Pilih tanggal"
              onChange={(date, dateString) =>
                handleChangeDatePicker(date, dateString, "tanggalAwal")
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tanggal Akhir</label>
            <DatePicker
              className="form-control"
              autoComplete="off"
              value={formData?.tanggalAkhir}
              placeholder="Pilih tanggal"
              onChange={(date, dateString) =>
                handleChangeDatePicker(date, dateString, "tanggalAkhir")
              }
            />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={formData.buttonState}
          onClick={_downloadMonev}
          color={"primary"}
          idleText={`${isEdit ? "Ubah" : "Unduh"}`}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
        />
      }
    />
  );
};

export default ModalMonev;
