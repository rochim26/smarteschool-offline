import Link from "next/link";
import React, { useState } from "react";
import { FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import ModalTambahPkl from "./ModalTambahPkl";
import {
  postKeteranganPkl,
  editKeteranganPkl,
  deleteKeteranganPkl,
} from "../../client/RaporClient";
import { toast } from "react-toastify";
import { hideModal } from "../../utilities/ModalUtils";
import { momentPackage } from "../../utilities/HelperUtils";

const DaftarKeteranganPkl = ({ keterangan, industri, getDetailRombelData }) => {
  const { user } = useUser();

  const initialStateForm = {
    id: "",
    namamitra: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    keterangan: "",
    active: "",
    btnBio: "idle",
  };
  const [formData, setFormData] = useState({
    ...initialStateForm,
  });

  const _postKeteranganPkl = async () => {
    if (!formData.namamitra.length) {
      toast.error("Anda belum memasukkan nama mitra");
      return;
    } else if (!formData.tanggalMulai.length) {
      toast.error("Anda belum memasukkan tanggal mulai");
      return;
    } else if (!formData.tanggalSelesai.length) {
      toast.error("Anda belum memasukkan tanggal selesai");
      return;
    } else if (!formData.keterangan.length) {
      toast.error("Anda belum memasukkan keterangan");
      return;
    }

    setFormData({ ...formData, btnBio: "loading" });
    const { data, error } = formData.active
      ? await editKeteranganPkl(formData.id, {
          namamitra: formData.namamitra,
          tanggal_mulai: momentPackage(formData.tanggalMulai).format(
            "YYYY-MM-DD"
          ),
          tanggal_selesai: momentPackage(formData.tanggalSelesai).format(
            "YYYY-MM-DD"
          ),
          keterangan: formData.keterangan,
        })
      : await postKeteranganPkl(
          {
            namamitra: formData.namamitra,
            tanggal_mulai: momentPackage(formData.tanggalMulai).format(
              "YYYY-MM-DD"
            ),
            tanggal_selesai: momentPackage(formData.tanggalSelesai).format(
              "YYYY-MM-DD"
            ),
            keterangan: formData.keterangan,
          },
          formData.id
        );

    if (data) {
      setFormData({ ...formData, btnBio: "success" });
      getDetailRombelData();
      hideModal("modalTambahPkl");
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

  const handleChangeDate = (dateString, key) => {
    setFormData({ ...formData, [key]: dateString });
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
        id: data?.id,
        namamitra: data?.namamitra,
        tanggalMulai: data?.tanggalMulai,
        tanggalSelesai: data?.tanggalSelesai,
        keterangan: data?.keterangan,
        active: "active",
      });
    }
  };

  const onClickTambah = (data) => {
    if (data) {
      setFormData({
        ...initialStateForm,
        id: data?.user?.keteranganRapor?.mUserId,
      });
    }
  };

  const handleDeletePkl = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteKeteranganPkl(id);
        if (data) {
          getDetailRombelData();
          toast.success(data?.message);
        } else {
          setButtonState("error");
        }
      }
    });
  };
  return (
    <div className="card card-ss">
      <div className="card-header p-4 card-header-ss">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">Daftar Siswa</h4>
        </div>
      </div>
      {keterangan?.map((d, idx) => {
        return (
          <div className="card-body px-4 pt-0">
            <ul className="list-group list-group-flush">
              <li className="list-group-item pt-0 pb-5 px-0 mb-5">
                <h5 className="fs-18-ss color-dark fw-bold mb-4">
                  {idx + 1}. {d?.user?.nama}
                </h5>
                {d?.user?.keteranganPkl != null && (
                  <>
                    <table className="table-ss">
                      <thead>
                        <tr>
                          <th style={{ width: "20%" }}>Mitra DU/DI</th>
                          <th style={{ width: "17%" }}>Tanggal Mulai</th>
                          <th style={{ width: "17%" }}>Tanggal Selesai</th>
                          <th>Lamanya</th>
                          <th colSpan="2">Keterangan</th>
                        </tr>
                      </thead>
                      {d?.user?.keteranganPkl?.map((d, idx) => {
                        return (
                          <tbody>
                            <tr>
                              <td data-th="Mitra DU/DI">
                                <span className="fw-semibold">
                                  {d?.namamitra}
                                </span>
                              </td>
                              <td data-th="Tanggal Mulai">
                                <span className="fw-semibold">{`${momentPackage(
                                  d?.tanggalMulai
                                ).format("DD MMMM YYYY")}`}</span>
                              </td>
                              <td data-th="Tanggal Selesai">
                                <span className="fw-semibold">{`${momentPackage(
                                  d?.tanggalSelesai
                                ).format("DD MMMM YYYY")}`}</span>
                              </td>
                              <td data-th="Lamanya">
                                <span className="fw-semibold">
                                  {d?.lamanya} Bulan
                                </span>
                              </td>
                              <td data-th="Keterangan">
                                <p className="fw-semibold mb-0">
                                  {d?.keterangan}
                                </p>
                              </td>
                              <td>
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
                                      data-bs-target="#modalTambahPkl"
                                    >
                                      <a className="dropdown-item">
                                        <FaPen className="me-2" />
                                        <span>Edit</span>
                                      </a>
                                    </li>
                                    <li onClick={() => handleDeletePkl(d?.id)}>
                                      <a className="dropdown-item color-danger">
                                        <FaTrashAlt className="me-2" />
                                        <span>Hapus</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                    <a
                      className="color-primary w-100 p-3 px-4 border-top-0 border-bottom-0 border-end-0 mb-1 fw-semibold d-flex align-items-center btn-tambah-table"
                      style={{
                        borderColor: `#92BFF5`,
                        borderWidth: "10px",
                        borderStyle: "solid",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#modalTambahPkl"
                      onClick={() => onClickTambah(d)}
                    >
                      <FaPlus className="me-2" /> Tambah
                    </a>
                  </>
                )}
              </li>
            </ul>
          </div>
        );
      })}
      <ModalTambahPkl
        handleChangeSelect={handleChangeSelect}
        handleChangeDate={handleChangeDate}
        _postKeteranganPkl={_postKeteranganPkl}
        handleChangeForm={handleChangeForm}
        formData={formData}
        industri={industri}
      />
    </div>
  );
};

export default DaftarKeteranganPkl;
