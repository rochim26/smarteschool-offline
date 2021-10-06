import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTambahPengalaman = ({ editIndex = null, setEditIndex }) => {

  const { user, setUser } = useUser();

  const newPengalaman = [{
    judul: "",
    instansi: "",
    dimulai: momentPackage(),
    berakhir: momentPackage(),
    deskripsi: ""
  }];

  const [buttonState, setButtonState] = useState("idle");

  const [formData, setFormData] = useState([
    ...user?.profil?.pengalaman || [],
    ...newPengalaman
  ]);

  const index = editIndex !== null ? editIndex : formData.length - 1;

  const handleChangeInput = (e) => {
    const copyFormData = [...formData];
    copyFormData[index][e.target.name] = e.target.value;
    setFormData(copyFormData);
  }

  const handleChangeDate = (date, name) => {
    const copyFormData = [...formData];
    copyFormData[index][name] = moment(date);
    setFormData(copyFormData);
  }

  const setupPayload = () => {
    const data = [...formData];
    if (data?.length > 0) {
      return data?.map(d => ({
        judul: d.judul,
        instansi: d.instansi,
        dimulai: momentPackage(d.dimulai).format("YYYY-MM-DD"),
        berakhir: momentPackage(d.berakhir).format("YYYY-MM-DD"),
        deskripsi: d.deskripsi
      }))
    }
  }

  const handleSubmit = async () => {
    setButtonState("loading")
    const payload = setupPayload();
    editIndex !== null && payload.splice(payload.length - 1, 1); // remove last item if edit index is not null
    const { data, error } = await postProfilUser({ pengalaman: payload });
    if (data) {
      editIndex !== null && setEditIndex(null);
      setButtonState("success");
      hideModal("modalTambahPengalaman");
      toast.success(data?.message);
      setUser({ ...user, profil: { ...user.profil, pengalaman: payload } });
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  }

  return (
    <>
      <NewModal
        onCloseModal={() => setEditIndex(null)}
        modalId="modalTambahPengalaman"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tambah Pengalaman</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk menambahkan pengalaman
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Judul Pengalaman</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="judul"
                placeholder="Contoh : Ketua OSIS Sekolah"
                value={formData[index].judul}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Lembaga</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="instansi"
                placeholder="Contoh : SMK Negeri XX"
                value={formData[index].instansi}
                onChange={handleChangeInput}
              />
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Dimulai Tanggal</label>
                <DatePicker
                  onChange={(date, dateString) =>
                    handleChangeDate(dateString, "dimulai")
                  }
                  placeholder="Pilih tanggal"
                  className="form-control"
                  autoComplete="off"
                  value={moment(formData[index].dimulai)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Berakhir tanggal</label>
                <DatePicker
                  onChange={(date, dateString) =>
                    handleChangeDate(dateString, "berakhir")
                  }
                  placeholder="Pilih Tanggal"
                  className="form-control"
                  autoComplete="off"
                  value={moment(formData[index].berakhir)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Deskripsi</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Tuliskan deskripsi mengenai pengalaman yang dilakukan"
                minRows={3}
                name="deskripsi"
                value={formData[index].deskripsi}
                onChange={handleChangeInput}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={buttonState}
            color={"primary"}
            idleText={`${editIndex !== null ? "Edit" : "Tambah"} Pengalaman`}
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

export default ModalTambahPengalaman;
