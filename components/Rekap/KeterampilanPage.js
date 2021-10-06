import Link from "next/link";
import React, { useState } from "react";
import { FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import ModalTambahKeterampilan from "./ModalTambahKeterampilan";
import { deleteRekap, postRekap, editRekap } from "../../client/RekapClient";
import { checkLabelTeknikPenilaian } from "../../utilities/RekapUtils";
import { toast } from "react-toastify";
import { hideModal } from "../../utilities/ModalUtils";

const KeterampilanPage = ({
  id,
  subnav,
  idRekap,
  _getDetailRekap,
  dataKeterampilan,
}) => {
  const { user } = useUser();

  const initialStateForm = {
    judul: "",
    teknik: "",
    tipe: "keterampilan",
    btnBio: "idle",
  };

  const [formData, setFormData] = useState({
    ...initialStateForm,
  });

  const _postRekapKeterampilan = async () => {
    if (formData.judul.trim() == "") {
      toast.error("Judul Belum di isi");
      return;
    } else if (!formData.teknik) {
      toast.error("Teknik Penilaian belum di isi");
      return;
    }
    setFormData({ ...formData, btnBio: "loading" });
    const { data, error } = formData.id
      ? await editRekap(idRekap, formData.id, {
          judul: formData.judul,
          teknik: formData.teknik,
        })
      : await postRekap(
          {
            judul: formData.judul,
            teknik: formData.teknik,
            tipe: "keterampilan",
          },
          idRekap
        );

    if (data) {
      setFormData({ ...formData, btnBio: "success" });
      _getDetailRekap();
      hideModal("modalTambahKeterampilan");
      toast.success(data?.message);
    } else {
      setFormData({ ...formData, btnBio: "error" });
      toast.error(error?.message);
    }
  };

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteRekapTugas = async (rekap_id, subrekap_id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteRekap(rekap_id, subrekap_id);
        if (data) {
          _getDetailRekap();
          toast.success(data?.message);
        } else {
          // error?.map((err) => toast.error(err?.message));
          setButtonState("error");
        }
      }
    });
  };

  const handleChangeSelect = (e, name) => {
    setFormData({
      ...formData,
      [name]: e?.value,
    });
  };

  const onClickEdit = (data) => {
    if (data) {
      setFormData({
        id: data.id,
        judul: data.judul,
        teknik: data.teknik,
      });
    }
  };
  return (
    <div className="card card-ss">
      <div className="card-header p-4 card-header-ss">
        <div className="d-flex justify-content-md-between align-items-md-center flex-column flex-md-row ">
          <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
            Daftar Materi Nilai Keterampilan{" "}
          </h4>
          {user?.role == "guru" && (
            <button
              type="button"
              className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#modalTambahKeterampilan"
              onClick={() => {
                // setEditId(null);
              }}
              data-joyride="btn-tambah-mapel"
            >
              <FaPlus /> Tambah
            </button>
          )}
        </div>
      </div>
      <div className="card-body p-0">
        {!dataKeterampilan?.length ? (
          <div className="row justify-content-center my-4">
            <div className="col-sm-3 col-8">
              <img
                src="/img/empty-state-daftar-soal.png"
                alt="empty-state"
                className="img-fluid mb-2"
              />
            </div>
            <div className="col-12 text-center">
              <h5 className="color-dark fw-black">Tugas Belum Ditambahkan</h5>
              <p className="fw-bold fs-14-ss">
                Tekan tombol{" "}
                <a
                  className="text-decoration-none color-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTambahKeterampilan"
                  onClick={() => setFormData(initialStateForm)}
                >
                  {" "}
                  di bawah ini
                </a>{" "}
                untuk membuat soal
              </p>
              <button
                type="button"
                className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahKeterampilan"
                onClick={() => {
                  setFormData(initialStateForm);
                }}
                data-joyride="btn-tambah-mapel"
              >
                Tambah Tugas
              </button>
            </div>
          </div>
        ) : (
          <div className="card-body p-0">
            <div className="">
              <table className="table-ss">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Judul Materi</th>
                    <th>Teknik Penilaian</th>
                    <th>Dibawah KKM</th>
                    <th>Rekap Nilai</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataKeterampilan?.map((d, idx) => {
                    return (
                      <tr key={idx}>
                        <td data-th="No">{idx + 1}</td>
                        <td data-th="Judul Materi">{d?.judul}</td>
                        <td data-th="Teknik Penilaian">
                          <span
                            className={checkLabelTeknikPenilaian(d?.teknik)}
                          >
                            {`${d?.teknik
                              ?.charAt(0)
                              ?.toUpperCase()}${d?.teknik?.slice(1)}`}
                          </span>
                        </td>

                        <td data-th="Dibawah KKM">
                          <span className="bg-soft-success rounded-pill color-success fs-12-ss fw-semibold py-1 px-3">
                            {/* {d?.nilai} Siswa */}
                            {d?.nilai} Siswa
                          </span>
                        </td>
                        <td data-th="Nilai">
                          <Link
                            href={`${ssURL}/rekap/${idRekap}/keterampilan/${d?.id}`}
                          >
                            <a className="bg-primary rounded-pill text-white justify-content-center align-items-center fw-semibold px-4 py-1">
                              Lihat
                            </a>
                          </Link>
                        </td>
                        <td data-th="">
                          {/* Dropdown Option Start */}

                          <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
                            <div
                              role="button"
                              id="dropdownOption"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src={`/img/icon-dropdown-option.svg`}
                                alt="icon-option"
                              />
                            </div>
                            <ul
                              className="dropdown-menu dropdown-menu-ss my-1"
                              aria-labelledby="dropdownOption"
                            >
                              <li
                                onClick={() => onClickEdit(d)}
                                data-bs-toggle="modal"
                                data-bs-target="#modalTambahKeterampilan"
                              >
                                <a className="dropdown-item">
                                  <FaPen className="me-2" />
                                  <span>Edit</span>
                                </a>
                              </li>
                              <li
                                onClick={() =>
                                  handleDeleteRekapTugas(idRekap, d?.id)
                                }
                              >
                                <a className="dropdown-item color-danger">
                                  <FaTrashAlt className="me-2" />
                                  <span>Hapus</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* Dropdown Option End */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ModalTambahKeterampilan
        handleChangeForm={handleChangeForm}
        handleChangeSelect={handleChangeSelect}
        formData={formData}
        _postRekap={_postRekapKeterampilan}
      />
    </div>
  );
};

export default KeterampilanPage;
