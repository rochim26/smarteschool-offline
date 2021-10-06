import ReactiveButton from "reactive-button";
import NewModal from "../NewModal/NewModal";
import { DatePicker, InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
import {
  postPembayaran,
  updatePembayaran,
} from "../../../client/PembayaranClient";
import { hideModal } from "../../../utilities/ModalUtils";
import { toast } from "react-toastify";
import { momentPackage } from "../../../utilities/HelperUtils";
import moment from "moment";
import { useRouter } from "next/router";
import { ssURL } from "../../../client/clientAxios";

const { Option } = Select;

const initialFormData = {
  jenis: "",
  nominal: "",
  bulan: "",
  tipeUjian: "",
  rombelId: [],
  nama: "",
  tanggalDibuat: "",
};

const ModalBuatPembayaran = ({
  _getPembayaran,
  tipePembayaran,
  tipeUjian,
  rombel,
  setEditData,
  editData,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  console.log(formData, router.query.nav);

  const children = [];
  rombel?.length > 0 &&
    rombel?.map((rombelData, idx) => {
      children.push(
        <Option key={rombelData?.id} value={rombelData?.id}>
          {rombelData?.nama}
        </Option>
      );
    });

  const handleChangeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleChangeSelect(value) {
    setFormData({
      ...formData,
      rombelId: value,
    });
  }

  function handleChangeDatePicker(date, dateString) {
    setFormData({
      ...formData,
      tanggalDibuat: dateString ? moment(dateString) : "",
    });
  }

  const _postPembayaran = async () => {
    if (!formData.nama) {
      toast.error("Nama Pembayaran harus diisi");
      return;
    }
    if (!formData.bulan && tipePembayaran == "spp") {
      toast.error("Bulan Pembayaran harus diisi");
      return;
    }
    if (!formData.tipeUjian && tipePembayaran == "ujian") {
      toast.error("Jenis Ulangan harus diisi");
      return;
    }
    if (!formData.nominal) {
      toast.error("Nominal Pembayaran harus diisi");
      return;
    }
    if (formData.rombelId.length == 0) {
      toast.error("Target rombel harus harus diisi");
      return;
    }
    if (!formData.tanggalDibuat) {
      toast.error("Tanggal harus harus diisi");
      return;
    }
    console.log(formData.nominal);

    const body = {
      ...formData,
      jenis: tipePembayaran,
      tanggalDibuat: momentPackage(formData.tanggalDibuat).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };

    const { data } = editData?.id
      ? await updatePembayaran(body, editData.id)
      : await postPembayaran(body);
    if (data) {
      if (router.query.nav != tipePembayaran) {
        router.push(`${ssURL}/pembayaran?nav=${tipePembayaran}`);
      }
      toast.success(data.message);
      _getPembayaran();
      hideModal("modalBuatPembayaran");
      setFormData(initialFormData);
      setEditData(null);
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        jenis: editData.jenis,
        nominal: editData.nominal,
        bulan: editData.bulan,
        tipeUjian: editData.tipeUjian,
        rombelId: editData.rombel?.map((item) => item.rombel.id),
        nama: editData.nama,
        tanggalDibuat: moment(editData.tanggalDibuat),
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <NewModal
      modalId="modalBuatPembayaran"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editData ? "Ubah" : "Buat"} Pembayaran{" "}
            {tipePembayaran == "spp" && "SPP"}{" "}
            {tipePembayaran == "ujian" && "Ujian"}{" "}
            {tipePembayaran == "lainnya" && "Lainnya"}
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editData ? "mengubah" : "menambahkan"}{" "}
            pembayaran {tipePembayaran == "spp" && "SPP"}{" "}
            {tipePembayaran == "ujian" && "Ujian"}{" "}
            {tipePembayaran == "lainnya" && "Lainnya"}
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Nama Pembayaran</label>
            <input
              className="form-control"
              placeholder="Tuliskan nama pembayaran"
              autoComplete="off"
              placeholder="Tuliskan nama pembayaran"
              type="text"
              name="nama"
              value={formData.nama || ""}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            {tipePembayaran == "spp" && (
              <>
                <label className="form-label">Bulan Rekening SPP</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="bulan"
                  value={formData?.bulan || ""}
                  onChange={handleChangeForm}
                >
                  <option hidden>Pilih bulan pembayaran SPP</option>
                  <option value="januari">Januari</option>
                  <option value="februari">Februari</option>
                  <option value="maret">Maret</option>
                  <option value="april">April</option>
                  <option value="mei">Mei</option>
                  <option value="juni">Juni</option>
                  <option value="juli">Juli</option>
                  <option value="agustus">Agustus</option>
                  <option value="september">September</option>
                  <option value="oktober">Oktober</option>
                  <option value="november">November</option>
                  <option value="desember">Desember</option>
                </select>
              </>
            )}
          </div>
          <div className="mb-4">
            {tipePembayaran == "ujian" && (
              <>
                <label className="form-label">Tipe Ujian</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="tipeUjian"
                  name="tipeUjian"
                  value={formData.tipeUjian || ""}
                  onChange={handleChangeForm}
                >
                  <option hidden>Pilih tipe ujian yang ingin dibayar</option>
                  {tipeUjian?.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                  {/* <option value="penilaian-tengah-semester-1">
                    Penilaian Tengah Semester 1
                  </option>
                  <option value="penilaian-tengah-semester-2">
                    Penilaian Tengah Semester 2
                  </option>
                  <option value="penilaian-akhir-semester-1">
                    Penilaian Akhir Semester 1
                  </option>
                  <option value="penilaian-akhir-semester-2">
                    Penilaian Akhir Semester 2
                  </option>
                  <option value="akm-literasi">AKM - Literasi</option>
                  <option value="akm-numerasi">AKM - Numerasi</option> */}
                </select>
              </>
            )}
            {tipePembayaran == "lainnya" && (
              <>
                <label className="form-label">Kategori Pembayaran</label>
                <Select
                  mode="tags"
                  placeholder="Pilih atau tambahkan kategori baru"
                  style={{ width: "100%" }}
                  // onChange={handleChangeTag}
                  // value={formData.tag}
                >
                  <Option value="trigonometri">Trigonometri</Option>
                  <Option value="kalkulus">Kalkulus</Option>
                  <Option value="teks biografi">Teks Biografi</Option>
                </Select>
              </>
            )}
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
            {/* <input
              className="form-control"
              autoComplete="off"
              placeholder="Rp. 0"
              type="number"
              name="nominal"
              value={formData.nominal}
              onChange={handleChangeForm}
            /> */}
          </div>
          <div className="mb-4">
            <label className="form-label">Bagikan Kepada</label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              value={formData.rombelId}
              placeholder="Bagikan Kepada"
              onChange={handleChangeSelect}
            >
              {children}
            </Select>
          </div>
          <div className="mb-4">
            <label className="form-label">Tanggal Dibuat</label>
            <DatePicker
              className="form-control"
              autoComplete="off"
              value={formData.tanggalDibuat || ""}
              placeholder="Pilih tanggal"
              onChange={handleChangeDatePicker}
            />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          // buttonState={"buttonState"}
          onClick={_postPembayaran}
          color={"primary"}
          idleText={`${editData ? "Ubah" : "Tambah"} Pembayar`}
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

export default ModalBuatPembayaran;
