import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postSanksiPelanggaran, updateSanksiPelanggaran } from "../../../client/TataTertibClient";
import { hideModal } from "../../../utilities/ModalUtils";
import NewModal from "../../Shared/NewModal/NewModal";

const initialFormData = {
  nama: "",
  poinAtas: "",
  poinBawah: "",
  tindakLanjut: []
}

const ModalTambahSanksiPelanggaran = ({ editData, _getSanksiPelanggaran }) => {

  const [formData, setFormData] = useState(initialFormData);
  console.log("formData", formData)

  const handleChangeForm = (e) => {
    if (!e.target.validity.valid) return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleChangePihakDitindakLanjut = (e) => {

    let arrTindakLanjut = [...formData.tindakLanjut];

    if (e.target.checked) {
      arrTindakLanjut.push(e.target.value);
    } else {
      arrTindakLanjut = arrTindakLanjut.filter(arr => arr !== e.target.value);
    }

    setFormData({
      ...formData,
      tindakLanjut: arrTindakLanjut
    });
  }

  const handleSubmit = async () => {
    const payload = { ...formData, tindakLanjut: formData?.tindakLanjut?.join(", ") };
    const { data } = editData ? await updateSanksiPelanggaran(payload, editData?.id) : await postSanksiPelanggaran(payload);
    if (data) {
      toast.success(data?.message);
      hideModal("ModalTambahSanksiPelanggaran");
      _getSanksiPelanggaran();
    }
  }
  
  const mappingCheckboxPihakDitindakLanjut = () => {
    const listCheckbox = [
      {
        value: "Wali Kelas",
        id: "checkbox-wali-kelas",
        onChange: (e) => handleChangePihakDitindakLanjut(e),
      },
      {
        value: "BK",
        id: "checkbox-bk",
        onChange: (e) => handleChangePihakDitindakLanjut(e),
      },
      {
        value: "Kepala Jurusan",
        id: "checkbox-kepala-jurusan",
        onChange: (e) => handleChangePihakDitindakLanjut(e),
      },
      {
        value: "Orang Tua",
        id: "checkbox-orang-tua",
        onChange: (e) => handleChangePihakDitindakLanjut(e),
      },
    ]

    return listCheckbox?.map(setting => (
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={formData?.tindakLanjut?.includes(setting.value)}
          {...setting}
        />
        <label
          className="form-check-label fs-14-ss fw-semibold"
          htmlFor={setting?.id}
        >
          {setting.value}
        </label>
      </div>
    ))
  }

  useEffect(() => {
    if (editData) {
      setFormData({
        nama: editData?.nama,
        poinAtas: editData?.poinAtas,
        poinBawah: editData?.poinBawah,
        tindakLanjut: editData?.tindakLanjut?.split(",")?.map(d => d?.trim())
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <>
      <NewModal
        modalId="ModalTambahSanksiPelanggaran"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">{editData ? "Ubah" : "Tambah"} Sanksi Pelanggaran</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah ini untuk menambah sanksi pelanggaran
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Sanksi Pelanggaran</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh: Terlambat"
                type="text"
                name="nama"
                value={formData?.nama}
                onChange={handleChangeForm}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Poin Batas Bawah</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    placeholder="Contoh : 0"
                    type="tel"
                    name="poinBawah"
                    pattern="[0-9]*"
                    value={formData?.poinBawah}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Poin Batas Atas</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    placeholder="Contoh : 25"
                    type="tel"
                    name="poinAtas"
                    pattern="[0-9]*"
                    value={formData?.poinAtas}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Pihak Ditindaklanjut</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  {mappingCheckboxPihakDitindakLanjut()}
                </div>
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={"idle"}
            color={"primary"}
            idleText={`${editData ? "Ubah" : "Tambah"} Poin Penghargaan`}
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

export default ModalTambahSanksiPelanggaran;
