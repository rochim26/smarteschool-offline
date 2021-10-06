import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";

const ModalTambahPendidikan = ({ editIndex = null, setEditIndex }) => {

  const { user, setUser } = useUser();

  const newPendidikan = [{
    instansi: "",
    gelar: "",
    jurusan: "",
    dimulai: momentPackage(),
    berakhir: momentPackage()
  }];

  const [buttonState, setButtonState] = useState("idle");

  const [formData, setFormData] = useState([
    ...user?.profil?.pendidikan || [],
    ...newPendidikan
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
        instansi: d.instansi,
        gelar: d.gelar,
        jurusan: d.jurusan,
        dimulai: momentPackage(d.dimulai).format("YYYY-MM-DD"),
        berakhir: momentPackage(d.berakhir).format("YYYY-MM-DD")
      }))
    }
  }

  const handleSubmit = async () => {
    setButtonState("loading")
    const payload = setupPayload();
    editIndex !== null && payload.splice(payload.length - 1, 1); // remove last item if edit index is not null
    const { data, error } = await postProfilUser({ pendidikan: payload });
    if (data) {
      editIndex !== null && setEditIndex(null);
      setButtonState("success");
      hideModal("modalTambahPendidikan");
      toast.success(data?.message);
      setUser({ ...user, profil: { ...user.profil, pendidikan: payload } });
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  }

  return (
    <>
      <NewModal
        onCloseModal={() => setEditIndex(null)}
        modalId="modalTambahPendidikan"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tambah Pendidikan</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk menambahkan pendidikan
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Instansi Pendidikan</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="instansi"
                placeholder="Masukkan Nama Instansi Pendidikan"
                value={formData[index].instansi}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Gelar</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="gelar"
                placeholder="Contoh : S. Kom"
                value={formData[index].gelar}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Jurusan</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="jurusan"
                placeholder="Contoh : Sistem Informatika Jaringan dan Aplikasi"
                value={formData[index].jurusan}
                onChange={handleChangeInput}
              />
            </div>
            <div className="row">
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
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={buttonState}
            color={"primary"}
            idleText={`${editIndex !== null ? "Edit" : "Tambah"} Pendidikan`}
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

export default ModalTambahPendidikan;
