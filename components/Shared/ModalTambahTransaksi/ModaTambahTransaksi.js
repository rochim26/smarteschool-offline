import { DatePicker, InputNumber } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { editMutasi, postMutasi } from "../../../client/MutasiClient";
import { momentPackage } from "../../../utilities/HelperUtils";
import { hideModal } from "../../../utilities/ModalUtils";
import NewModal from "../NewModal/NewModal";

const initialFormData = {
  nama: "",
  tipe: "",
  kategori: "",
  nominal: "",
  waktuDibuat: momentPackage(),
};

const ModalTambahTransaksi = ({ _getMutasi, editData }) => {
  const [buttonState, setButtonState] = useState("idle");
  const [formData, setFormData] = useState(initialFormData);

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleChangeDatePicker(date, dateString) {
    setFormData({
      ...formData,
      waktuDibuat: dateString ? momentPackage(dateString) : "",
    });
  }

  const _postTransaksi = async () => {
    if (!formData.tipe) {
      toast.error("Tipe transaksi harus dipilih");
      return;
    }
    if (!formData.nama) {
      toast.error("Nama transaksi harus diisi");
      return;
    }
    if (!formData.waktuDibuat) {
      toast.error("Tanggal transaksi harus diisi");
      return;
    }
    if (!formData.kategori) {
      toast.error("Kategori transaksi harus diisi");
      return;
    }
    if (!formData.nominal) {
      toast.error("Nominal transaksi harus diisi");
      return;
    }
    setButtonState("loading");
    const payload = {
      ...formData,
      waktuDibuat: momentPackage(formData.waktuDibuat).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };

    const { data, error } = editData
      ? await editMutasi(payload, editData?.id)
      : await postMutasi(payload);
    if (data) {
      toast.success(data.message);
      _getMutasi();
      hideModal("modalTambahTransaksi");
      setButtonState("success");
    } else {
      toast.error(error.message);
      setButtonState("error");
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData({ ...formData, ...editData });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <NewModal
      modalId="modalTambahTransaksi"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">Tambah Transaksi</h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editData ? "mengubah" : "menambahkan"}{" "}
            transaksi
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <>
              <label className="form-label">Tipe Transaksi</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={formData?.tipe}
                name="tipe"
                onChange={handleChangeForm}
              >
                <option hidden>Pilih tipe transaksi</option>
                <option value="kredit">pemasukan</option>
                <option value="debit">pengeluaran</option>
              </select>
            </>
          </div>
          <div className="mb-4">
            <label className="form-label">Nama</label>
            <input
              className="form-control"
              placeholder="Tuliskan nama transaksi"
              type="text"
              value={formData?.nama}
              name="nama"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Tanggal Transaksi</label>
            <DatePicker
              className="form-control"
              autoComplete="off"
              value={formData.waktuDibuat || ""}
              placeholder="Pilih tanggal"
              onChange={handleChangeDatePicker}
            />
          </div>
          <div className="mb-4">
            <>
              <label className="form-label">Kategori Transaksi</label>
              <input
                className="form-control"
                placeholder="Tuliskan kategori transaksi"
                type="text"
                value={formData?.kategori}
                name="kategori"
                onChange={handleChangeForm}
              />
            </>
          </div>

          <div className="mb-4">
            <label className="form-label">Nominal</label>
            <InputNumber
              className="form-control w-100"
              formatter={(value) =>
                `Rp.${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              placeholder="Rp. 0"
              autoComplete="off"
              name="nominal"
              value={formData.nominal}
              parser={(value) => value.replace(/Rp|\./g, "")}
              onChange={(value) =>
                handleChangeForm({ target: { name: "nominal", value } })
              }
              step={1000}
            />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={_postTransaksi}
          color={"primary"}
          idleText={`${editData ? "Ubah" : "Tambah"} Transaksi`}
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

export default ModalTambahTransaksi;
