import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { editPelanggaranSiswa, postPelanggaranSiswa } from "../../../client/TataTertibClient";
import { momentPackage } from "../../../utilities/HelperUtils";
import { hideModal } from "../../../utilities/ModalUtils";
import NewModal from "../../Shared/NewModal/NewModal";
import SelectShared from "../../Shared/SelectShared/SelectShared";

const initialFormData = {
  mPelanggaranId: "",
  catatan: "",
  tanggalPelanggaran: momentPackage(),
  poin: ""
}

const ModalTambahPelanggaran = ({ listPelanggaran=[], siswa, _getDetailSiswa, editDataBentukPelanggaran=null }) => {
  const bentukPelanggaran = [];

  listPelanggaran?.length > 0 && listPelanggaran?.map(kategori => {
    kategori?.pelanggaran?.length > 0 && kategori?.pelanggaran?.map(pel => {
      bentukPelanggaran.push({ value: pel?.id, label: pel?.nama, poin: pel?.poin });
    })
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChangeSelect = (e) => {
    setFormData({
      ...formData,
      mPelanggaranId: e.value,
      poin: e.poin
    })
  }

  const handleChangeDate = (date) => {
    setFormData({
      ...formData,
      tanggalPelanggaran: date,
    });
  };

  const handleSubmit = async () => {
    const { data,error } = editDataBentukPelanggaran ? await editPelanggaranSiswa(editDataBentukPelanggaran?.id, { ...formData, tanggalPelanggaran: momentPackage(formData.tanggalPelanggaran).format("YYYY-MM-DD") }) : await postPelanggaranSiswa(siswa?.id, { ...formData, tanggalPelanggaran: momentPackage(formData.tanggalPelanggaran).format("YYYY-MM-DD") });
    if (data) {
      toast.success(data?.message);
      hideModal("ModalTambahPelanggaran");
      _getDetailSiswa(siswa?.id);
    } else {
      error?.map(err => toast?.error(err?.message));
    }
  }

  useEffect(() => {
    if (editDataBentukPelanggaran !== null) {
      setFormData({
        mPelanggaranId: editDataBentukPelanggaran.mPelanggaranId,
        catatan: editDataBentukPelanggaran.catatan,
        tanggalPelanggaran: momentPackage(editDataBentukPelanggaran.tanggalPelanggaran),
        poin: editDataBentukPelanggaran.poin
      })
    } else {
      setFormData(initialFormData);
    }
  }, [editDataBentukPelanggaran])

  return (
    <>
      <NewModal
        modalId="ModalTambahPelanggaran"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">{editDataBentukPelanggaran ? "Ubah" : "Tambah"} Pelanggaran </h4>
            <span className="fs-14-ss fw-normal">
              Isi informasi dibawah ini untuk menambah pelanggaran
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Bentuk Pelanggaran</label>
              <SelectShared
                placeholder="Pilih Bentuk Pelanggaran"
                handleChangeSelect={(e) => handleChangeSelect(e)}
                value={formData.mPelanggaranId}
                options={bentukPelanggaran}
              />
            </div>
            <div className="mb-4">
              {/* * Catatan Developer : Kalo dipilih bentuk pelanggarannya auto isi */}
              <label className="form-label">Poin</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Poin"
                type="text"
                name="poin"
                disabled
                value={formData?.poin}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Tanggal Pelanggaran</label>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChangeDate(dateString)
                }
                placeholder="dd / mm / yyyy -- : --"
                className="form-control"
                autoComplete="off"
                value={momentPackage(formData.tanggalPelanggaran)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Catatan</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan catatan untuk siswa"
                type="text"
                name="nama"
                style={{}}
                value={formData?.catatan}
                onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={"idle"}
            color={"primary"}
            idleText={`${editDataBentukPelanggaran ? "Ubah" : "Tambah"} Pelanggaran`}
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

export default ModalTambahPelanggaran;
