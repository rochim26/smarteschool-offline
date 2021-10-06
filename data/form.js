import axios from "axios";
import { baseURL } from "../client/clientAxios";
import { getPreview } from "../client/sharedClient";
import { editJadwalMengajar } from "../client/JadwalMengajarClient";

export const buildSettingFormProfilSekolah = (state, setState) => {
  return [
    {
      label: "Nama",
      name: "nama",
      type: "text",
      value: state?.nama,
      onChange: (e) => setState({ ...state, nama: e.target.value }),
    },
    {
      label: "NPSN",
      name: "npsn",
      type: "text",
      value: state?.npsn,
      onChange: (e) => setState({ ...state, npsn: e.target.value }),
    },
    {
      label: "NSS",
      name: "nss",
      type: "text",
      value: state?.nss,
      onChange: (e) => setState({ ...state, nss: e.target.value }),
    },
    {
      label: "Jenjang",
      name: "jenjang",
      type: "select",
      value: state?.jenjang,
      onChange: (e) => setState({ ...state, jenjang: e.target.value }),
      selectOptions: [
        { label: "Pilih Jenjang", value: "" },
        { label: "PAUD", value: "PAUD" },
        { label: "RA", value: "RA" },
        { label: "TK", value: "TK" },
        { label: "SD", value: "SD" },
        { label: "MI", value: "MI" },
        { label: "SMP", value: "SMP" },
        { label: "MTs", value: "MTs" },
        { label: "SMA", value: "SMA" },
        { label: "MA", value: "MA" },
        { label: "SMK", value: "SMK" },
      ],
    },
    {
      label: "Status",
      name: "status",
      type: "checkbox",
      value: state?.status,
      onChange: (e) => setState({ ...state, status: e.target.value }),
      checkboxOptions: [
        { label: "Negeri", value: "N" },
        { label: "Swasta", value: "S" },
      ],
    },
  ];
};

export const buildSettingFormLokasiSekolah = (state, setState) => {
  return [
    {
      label: "Alamat",
      name: "alamat",
      type: "textarea",
      value: state?.alamat,
      onChange: (e) => setState({ ...state, alamat: e.target.value }),
    },
    {
      label: "RT",
      name: "rt",
      type: "text",
      value: state?.rt,
      onChange: (e) => setState({ ...state, rt: e.target.value }),
    },
    {
      label: "RW",
      name: "rw",
      type: "text",
      value: state?.rw,
      onChange: (e) => setState({ ...state, rw: e.target.value }),
    },
    {
      label: "Provinsi",
      name: "province",
      type: "combobox",
      value: state?.province,
      onChange: (e) => setState({ ...state, province: e }),
    },
    {
      label: "Kabupaten/Kota",
      name: "regency",
      type: "combobox",
      value: state?.regency,
      onChange: (e) => setState({ ...state, regency: e }),
    },
    {
      label: "Kecamatan",
      name: "district",
      type: "combobox",
      value: state?.district,
      onChange: (e) => setState({ ...state, district: e }),
    },
    {
      label: "Desa/Kelurahan",
      name: "village",
      type: "combobox",
      value: state?.village,
      onChange: (e) => setState({ ...state, village: e }),
    },
    {
      label: "Dusun",
      name: "dusun",
      type: "text",
      value: state?.dusun,
      onChange: (e) => setState({ ...state, dusun: e.target.value }),
    },
    {
      label: "Kode Pos",
      name: "kode_pos",
      type: "text",
      value: state?.kode_pos,
      onChange: (e) => setState({ ...state, kode_pos: e.target.value }),
    },
  ];
};

export const buildSettingFormKontakSekolah = (state, setState) => {
  return [
    {
      label: "Email",
      name: "email",
      type: "email",
      value: state?.email,
      onChange: (e) => setState({ ...state, email: e.target.value }),
    },
    {
      label: "Telpon",
      name: "telp",
      type: "text",
      value: state?.telp,
      onChange: (e) => setState({ ...state, telp: e.target.value }),
    },
    {
      label: "Fax",
      name: "fax",
      type: "text",
      value: state?.fax,
      onChange: (e) => setState({ ...state, fax: e.target.value }),
    },
  ];
};

export const buildSettingForm = (state, setState, form) => {
  if (form == "Tambah Sekolah") {
    return [
      {
        label: "Cari berdasarkan NPSN",
        name: "npsn",
        type: "text",
        value: state?.npsn,
        onChange: (e) => setState({ ...state, npsn: e.target.value }),
      },
    ];
  }

  if (form == "Tambah Jurusan") {
    return [
      {
        label: "Kode",
        name: "kode",
        type: "text",
        value: state?.kode,
        onChange: (e) => setState({ ...state, kode: e.target.value }),
      },
      {
        label: "Nama",
        name: "nama",
        type: "text",
        value: state?.nama,
        onChange: (e) => setState({ ...state, nama: e.target.value }),
      },
      {
        label: "SPP",
        name: "spp",
        type: "number",
        value: state?.spp,
        onChange: (e) => setState({ ...state, spp: e.target.value }),
      },
      {
        label: "Sumbangan Sarana Pendidikan",
        name: "sumbanganSaranaPendidikan",
        type: "number",
        value: state?.sumbanganSaranaPendidikan,
        onChange: (e) =>
          setState({ ...state, sumbanganSaranaPendidikan: e.target.value }),
      },
      {
        label: "Kegiatan Osis",
        name: "kegiatanOsis",
        type: "number",
        value: state?.kegiatanOsis,
        onChange: (e) => setState({ ...state, kegiatanOsis: e.target.value }),
      },
      {
        label: "MPLS & Jas Almamater",
        name: "mplsJasAlmamater",
        type: "number",
        value: state?.mplsJasAlmamater,
        onChange: (e) =>
          setState({ ...state, mplsJasAlmamater: e.target.value }),
      },
      {
        label: "Seragam Sekolah",
        name: "seragamSekolah",
        type: "number",
        value: state?.seragamSekolah,
        onChange: (e) => setState({ ...state, seragamSekolah: e.target.value }),
      },
      {
        label: "Toolkit Praktek",
        name: "toolkitPraktek",
        type: "number",
        value: state?.toolkitPraktek,
        onChange: (e) => setState({ ...state, toolkitPraktek: e.target.value }),
      },
    ];
  }

  if (form === "Tambah Guru" || form === "Tambah Siswa") {
    return [
      {
        label: "Nama",
        name: "Nama",
        type: "text",
        value: state?.nama,
        onChange: (e) => setState({ ...state, nama: e.target.value }),
      },
      {
        label: "Jenis Kelamin",
        name: "gender",
        type: "select",
        value: state?.gender,
        onChange: (e) => setState({ ...state, gender: e.target.value }),
        selectOptions: [
          {
            value: "L",
            label: "Laki - Laki",
          },
          {
            value: "P",
            label: "Perempuan",
          },
        ],
      },
      {
        label: "Whatsapp",
        name: "whatsapp",
        type: "text",
        value: state?.whatsapp,
        onChange: (e) => setState({ ...state, whatsapp: e.target.value }),
      },
      {
        label: "Password",
        name: "password",
        type: state?.showPassword ? "text" : "password",
        value: state?.password ? state?.password : "",
        onChange: (e) => setState({ ...state, password: e.target.value }),
      },
      {
        label: "Tampilkan Password",
        name: "tampilkanPassword",
        type: "checkbox",
        value: state?.showPassword,
        onChange: (e) =>
          setState({ ...state, showPassword: !state?.showPassword }),
        checkboxOptions: [{ label: "Tampilkan", value: "" }],
      },
      {
        label: "Foto",
        name: "avatar",
        type: "file",
        // value: state?.avatar,
        onChange: async (e) => {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          const { data } = await axios.post(
            baseURL + "/single-upload",
            formData
          );
          setState({ ...state, avatar: data });
        },
      },
    ];
  }

  if (form === "Tambah Tahun Akademik") {
    return [
      {
        label: "Tahun",
        name: "tahun",
        type: "text",
        value: state?.tahun,
        onChange: (e) => setState({ ...state, tahun: e.target.value }),
      },
      {
        label: "Semester",
        name: "semester",
        type: "text",
        value: state?.semester,
        onChange: (e) => setState({ ...state, semester: e.target.value }),
      },
      {
        label: "Nama Kepsek",
        name: "namaKepsek",
        type: "text",
        value: state?.namaKepsek,
        onChange: (e) => setState({ ...state, namaKepsek: e.target.value }),
      },
      {
        label: "NIP Kepsek",
        name: "nipKepsek",
        type: "text",
        value: state?.nipKepsek,
        onChange: (e) => setState({ ...state, nipKepsek: e.target.value }),
      },
      {
        label: "Status",
        name: "aktif",
        type: "select",
        value: state?.aktif,
        onChange: (e) => setState({ ...state, aktif: e.target.value }),
        selectOptions: [
          {
            value: 0,
            label: "Non-aktif",
          },
          {
            value: 1,
            label: "Aktif",
          },
        ],
      },
    ];
  }

  if (form == "Tambah Mata Pelajaran") {
    return [
      {
        label: "Nama Mapel",
        name: "nama",
        type: "text",
        value: state?.nama,
        onChange: (e) => setState({ ...state, nama: e.target.value }),
      },
      {
        label: "Kode Mapel",
        name: "kode",
        type: "text",
        value: state?.kode,
        onChange: (e) => setState({ ...state, kode: e.target.value }),
      },
      {
        label: "Kelompok",
        name: "kelompok",
        type: "select",
        value: state?.kelompok,
        onChange: (e) => setState({ ...state, kelompok: e.target.value }),
        selectOptions: [
          {
            value: "A",
            label: "Kelompok A (Muatan Nasional)",
          },
          {
            value: "B",
            label: "Kelompok B (Muatan Kewilayahan)",
          },
          {
            value: "C",
            label: "Kelompok C (Muatan Kejuruan)",
          },
        ],
      },
      {
        label: "Guru Pengampu",
        selectOptions: state?.listGuru,
        name: "m_user_id",
        type: "select-antd",
        placeholder: "Cari Pengampu",
        valueField: "id",
        textField: "nama",
        value: state?.m_user_id ? state?.m_user_id : state?.mUserId,
        onChange: (e) => setState({ ...state, m_user_id: e }),
      },
      {
        label: "KKM",
        name: "kkm",
        type: "number",
        value: state?.kkm,
        onChange: (e) => setState({ ...state, kkm: e.target.value }),
      },
    ];
  }

  if (form == "Hari Jam Mengajar") {
    return [
      {
        label: "",
        name: "hari",
        type: "select",
        value: state?.kodeHari,
        onChange: (e) => setState({ ...state, kodeHari: e.target.value }),
        selectOptions: [
          {
            value: 1,
            label: "Senin",
          },
          {
            value: 2,
            label: "Selasa",
          },
          {
            value: 3,
            label: "Rabu",
          },
          {
            value: 4,
            label: "Kamis",
          },
          {
            value: 5,
            label: "Jumat",
          },
          {
            value: 6,
            label: "Sabtu",
          },
        ],
      },
    ];
  }

  if (form == "Atur Jadwal Mengajar") {
    return [
      {
        label: "",
        name: "tingkat",
        type: "select",
        value: state?.tingkat,
        onChange: (e) => setState({ ...state, tingkat: e.target.value }),
        selectOptions: state?.listTingkatRombel,
      },
    ];
  }

  if (form === "Tambah Jam Mengajar") {
    return [
      {
        label: "Hari",
        name: "hari",
        type: "text",
        value: state?.hari,
        readOnly: true,
        onChange: (e) => setState({ ...state, hari: e.target.value }),
      },
      {
        label: "Jam Ke",
        name: "jamKe",
        type: "text",
        value: state?.jamKe,
        readOnly: true,
        onChange: (e) => setState({ ...state, jamKe: e.target.value }),
      },
      {
        label: "Jam Dimulai",
        name: "jamMulai",
        type: "time",
        value: state?.jamMulai,
        onChange: (date) => setState({ ...state, jamMulai: date }),
      },
      {
        label: "Jam Selesai",
        name: "jamSelesai",
        type: "time",
        value: state?.jamSelesai,
        onChange: (date) => setState({ ...state, jamSelesai: date }),
      },
      {
        label: "Istirahat",
        name: "istirahat",
        type: "radio",
        value: state?.istirahat,
        onChange: (e) => setState({ ...state, istirahat: e }),
      },
    ];
  }

  if (form === "Tambah Rombel") {
    return [
      {
        label: "Pilih Tingkat",
        selectOptions: state?.listTingkat,
        onChange: (e) => setState({ ...state, tingkat: e }),
        placeholder: "Cari tingkat",
        type: "select-antd",
      },
      {
        label: "Pilih Jurusan",
        selectOptions: state?.listJurusan,
        onChange: (e) => setState({ ...state, jurusan: e }),
        placeholder: "Cari jurusan",
        type: "select-antd",
      },
      {
        label: "Pilih Kode",
        name: "kode",
        type: "text",
        value: state?.kode,
        onChange: (e) => setState({ ...state, kode: e.target.value }),
      },
      {
        label: "Atur Wali Kelas",
        selectOptions: state?.listGuru,
        onChange: (e) => setState({ ...state, guru: e }),
        placeholder: "Cari wali kelas",
        type: "select-antd",
      },
    ];
  }

  if (form == "Jadwal Mengajar") {
    return [
      {
        label: "",
        data: state?.listMataPelajaran,
        type: "new-combobox",
        placeHolder: "Pilih Guru Pengajar",
        textField: (item) =>
          typeof item === "string" ? item : `${item.user?.nama} - ${item.nama}`,
        onSelect: async (e) => {
          await editJadwalMengajar(state?.jadwalMengajarId, {
            mMataPelajaranId: e.id,
          });
        },
      },
    ];
  }
};
