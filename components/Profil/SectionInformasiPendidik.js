import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import { postProfilUser } from "../../client/AuthClient";
import {
  getDistrict,
  getProvince,
  getRegency,
  getVillage,
} from "../../client/LokasiClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import { hideModal } from "../../utilities/ModalUtils";
import ModalEditDetailProfil from "./ModalEditDetailProfil";

const SectionInformasiPendidik = ({ isReadOnly = false }) => {
  const { user, setUser } = useUser();

  const [buttonState, setButtonState] = useState("idle");

  const [province, setProvince] = useState([]);
  const [regency, setRegency] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);

  const [formData, setFormData] = useState({
    nisn: user?.profil?.nisn,
    whatsapp: user?.whatsapp,
    nama: user?.nama,
    gender: user?.gender,
    agama: user?.agama,
    email: user?.email,
    tempatLahir: user?.tempatLahir,
    tanggalLahir: momentPackage(user?.tanggalLahir),
    asalSekolah: user?.profil?.asalSekolah,
    kodepos: user?.profil?.kodepos,
    provinceId: user?.profil?.provinceId,
    regencyId: user?.profil?.regencyId,
    districtId: user?.profil?.districtId,
    villageId: user?.profil?.villageId,
    alamat: user?.profil?.alamat,
  });

  const _postProfilUser = async () => {
    setButtonState("loading");
    const { data, error } = await postProfilUser({
      ...formData,
      tanggalLahir: formData.tanggalLahir
        ? momentPackage(formData.tanggalLahir).format("YYYY-MM-DD")
        : momentPackage().format("YYYY-MM-DD"),
    });

    if (data) {
      setButtonState("success");
      hideModal("modalEditDetailProfil");
      toast.success(data?.message);
      setUser({
        ...user,
        whatsapp: formData.whatsapp,
        nama: formData.nama,
        gender: formData.gender,
        tempatLahir: formData.tempatLahir,
        tanggalLahir: formData.tanggalLahir,
        agama: user?.agama,
        profil: {
          ...user?.profil,
          nisn: formData.nisn,
          asalSekolah: formData.asalSekolah,
          kodepos: formData.kodepos,
          provinceId: formData.provinceId,
          regencyId: formData.regencyId,
          districtId: formData.districtId,
          villageId: formData.villageId,
          alamat: formData?.alamat,
        },
      });
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  };

  const handleChangeDate = (e, name) => {
    setFormData({
      ...formData,
      [name]: e,
    });
  };

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSelect = (e, name) => {
    if (name == "provinceId") {
      _getRegency({
        provinceId: e?.value,
      });
    }

    if (name == "regencyId") {
      _getDistrict({
        regencyId: e?.value,
      });
    }

    if (name == "districtId") {
      _getVillage({
        districtId: e?.value,
      });
    }

    setFormData({
      ...formData,
      [name]: e?.value,
    });
  };

  const _getProvince = async () => {
    const { data } = await getProvince();

    if (data) {
      setProvince(
        data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
    }
  };

  const _getRegency = async (params) => {
    const { data } = await getRegency(params);

    if (data) {
      setRegency(
        data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
    }
  };

  const _getDistrict = async (params) => {
    const { data } = await getDistrict(params);

    if (data) {
      setDistrict(
        data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
    }
  };

  const _getVillage = async (params) => {
    const { data } = await getVillage(params);

    if (data) {
      setVillage(
        data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
    }
  };

  useEffect(() => {
    _getProvince();
    formData.provinceId && _getRegency({ provinceId: formData.provinceId });
    formData.regencyId && _getDistrict({ regencyId: formData.regencyId });
    formData.districtId && _getVillage({ districtId: formData.districtId });
  }, []);

  return (
    <>
      <div className="card card-ss">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-extrabold color-dark mb-0">Informasi Pendidik</h4>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Nama Sekolah</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.sekolah?.nama}
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Pengampu Pelajaran</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.pengampu}
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Pangkat</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.pangkat}
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Golongan</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.golongan}
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Jabatan</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0">
                {user?.profil?.jabatan}
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Kelas Perwalian</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0">
                {user?.profil?.kelas}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SectionInformasiPendidik;
