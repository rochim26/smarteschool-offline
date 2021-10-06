import Link from "next/link";
import React, { useState } from "react";
import { FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import ModalTambahSikapSosial from "./ModalTambahSikapSosial";
import ModalTambahSikapSpiritual from "./ModalTambahSikapSpiritual";
import { checkKeteranganSikap } from "../../utilities/RaporUtils";
import {
  deleteSikapSpiritual,
  deleteSikapSosial,
  postSikapSosial,
  postSikapSpiritual,
} from "../../client/RaporClient";
import { hideModal } from "../../utilities/ModalUtils";
import { toast } from "react-toastify";

const DaftarSikap = ({
  sikapsosial,
  sikapspiritual,
  keterangan,
  getDetailRombelData,
}) => {
  const { user } = useUser();
  const initialStateForm = {
    id: "",
    mSikapSosialDitunjukkanId: [],
    mSikapSosialDitingkatkanId: [],
    mSikapSpiritualDitunjukkanId: [],
    mSikapSpiritualDitingkatkanId: [],
  };

  const [formData, setFormData] = useState(initialStateForm);

  const handleChangeFormCheck = (e) => {
    const parse = JSON.parse(e.target.value);

    const check = formData[e.target.name].findIndex((d) => d == parse);

    if (check >= 0) {
      const filtered = formData[e.target.name].filter((d) => d != parse);

      setFormData({
        ...formData,
        [e.target.name]: [...filtered],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: [...formData[e.target.name], parse],
      });
    }
  };

  const _postSikapSpiritual = async () => {
    if (!formData.mSikapSpiritualDitunjukkanId.length) {
      toast.error("Anda belum memasukkan sikap spiritual yang ditunjukkan");
      return;
    } else if (!formData.mSikapSpiritualDitingkatkanId.length) {
      toast.error("Anda belum memasukkan sikap spiritual yang ditingkatkan");

      return;
    }

    setFormData({ ...formData, btnBio: "loading" });
    const { data, error } = await postSikapSpiritual(
      {
        m_sikap_spiritual_ditunjukkan_id: formData.mSikapSpiritualDitunjukkanId,
        m_sikap_spiritual_ditingkatkan_id:
          formData.mSikapSpiritualDitingkatkanId,
      },
      formData.id
    );

    if (data) {
      setFormData({ ...formData, btnBio: "success" });
      getDetailRombelData();
      hideModal("modalTambahSikapSpiritual");
      toast.success(data?.message);
    } else {
      setFormData({ ...formData, btnBio: "error" });
      toast.error(error?.message);
    }
  };

  const _postSikapSosial = async () => {
    if (!formData.mSikapSosialDitunjukkanId.length) {
      toast.error("Anda belum memasukkan sikap sosial yang ditunjukkan");
      return;
    } else if (!formData.mSikapSosialDitingkatkanId.length) {
      toast.error("Anda belum memasukkan sikap sosial yang ditingkatkan");

      return;
    }
    setFormData({ ...formData, btnBio: "loading" });
    const { data, error } = await postSikapSosial(
      {
        m_sikap_sosial_ditunjukkan_id: formData.mSikapSosialDitunjukkanId,
        m_sikap_sosial_ditingkatkan_id: formData.mSikapSosialDitingkatkanId,
      },
      formData.id
    );

    if (data) {
      setFormData({ ...formData, btnBio: "success" });
      getDetailRombelData();
      hideModal("modalTambahSikapSosial");
      toast.success(data?.message);
    } else {
      setFormData({ ...formData, btnBio: "error" });
      toast.error(error?.message);
    }
  };

  const onClickEditSpiritual = (data) => {
    if (data) {
      let mSikapSpiritualDitunjukkanId = data?.mSikapSpiritualDitunjukkanId
        .split(",")
        .map(function (item) {
          return parseInt(item, 10);
        });

      let mSikapSpiritualDitingkatkanId = data?.mSikapSpiritualDitingkatkanId
        .split(",")
        .map(function (item) {
          return parseInt(item, 10);
        });

      setFormData({
        ...initialStateForm,
        id: data?.mUserId,
        mSikapSpiritualDitunjukkanId: mSikapSpiritualDitunjukkanId,
        mSikapSpiritualDitingkatkanId: mSikapSpiritualDitingkatkanId,
      });
    }
  };

  const onClickEditSosial = (data) => {
    if (data) {
      let mSikapSosialDitunjukkanId = data?.mSikapSosialDitunjukkanId
        .split(",")
        .map(function (item) {
          return parseInt(item, 10);
        });

      let mSikapSosialDitingkatkanId = data?.mSikapSosialDitingkatkanId
        .split(",")
        .map(function (item) {
          return parseInt(item, 10);
        });

      setFormData({
        ...initialStateForm,
        id: data?.mUserId,
        mSikapSosialDitunjukkanId: mSikapSosialDitunjukkanId,
        mSikapSosialDitingkatkanId: mSikapSosialDitingkatkanId,
      });
    }
  };

  const onClickTambah = (data) => {
    if (data) {
      setFormData({
        ...initialStateForm,
        id: data?.user?.id,
      });
    }
  };

  const handleDeleteSikapSpiritual = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteSikapSpiritual(id);
        if (data) {
          getDetailRombelData();
          toast.success(data?.message);
        } else {
          setButtonState("error");
        }
      }
    });
  };

  const handleDeleteSikapSosial = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteSikapSosial(id);
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
    <>
      <div className="card card-ss">
        <div className="card-header p-4 card-header-ss">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
              Daftar Sikap Siswa
            </h4>
          </div>
        </div>
        <div className="card-body px-4 pt-0">
          <ul className="list-group list-group-flush">
            {keterangan?.map((d, idx) => {
              return (
                <li className="list-group-item pt-0 pb-5 px-0 mb-5">
                  <h5 className="fs-18-ss color-dark fw-bold mb-4">
                    {idx + 1}. {d?.user?.nama}
                  </h5>
                  <table className="table-ss">
                    <thead>
                      <tr>
                        <th style={{ width: "15%" }}>Nama Sikap</th>
                        <th colSpan="2">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d?.user?.sikap?.mSikapSpiritualDitingkatkanId !=
                        null && (
                        <tr>
                          <td data-th="Nama Sikap">
                            <span className="fw-semibold">Sikap Spiritual</span>
                          </td>
                          <td data-th="Keterangan">
                            <p className="fw-semibold mb-0">
                              Peserta didik telah menunjukkan sikap{" "}
                              {checkKeteranganSikap(
                                d?.user?.sikap?.mSikapSpiritualDitunjukkanId,
                                sikapspiritual
                              )}{" "}
                              dengan baik. Namun sikap{" "}
                              {checkKeteranganSikap(
                                d?.user?.sikap?.mSikapSpiritualDitingkatkanId,
                                sikapspiritual
                              )}{" "}
                              masih perlu ditingkatkan lagi .
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
                                  onClick={() =>
                                    onClickEditSpiritual(d?.user?.sikap)
                                  }
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalTambahSikapSpiritual"
                                >
                                  <a className="dropdown-item">
                                    <FaPen className="me-2" />
                                    <span>Edit</span>
                                  </a>
                                </li>
                                <li
                                  onClick={() =>
                                    handleDeleteSikapSpiritual(d?.user?.id)
                                  }
                                >
                                  <a className="dropdown-item color-danger">
                                    <FaTrashAlt className="me-2" />
                                    <span>Hapus</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                      {d?.user?.sikap?.mSikapSosialDitingkatkanId != null && (
                        <tr>
                          <td data-th="Nama">
                            <span className="fw-semibold">Sikap Sosial</span>
                          </td>
                          <td data-th="Keterangan">
                            <p className="fw-semibold mb-0">
                              Peserta didik telah menunjukkan sikap{" "}
                              {checkKeteranganSikap(
                                d?.user?.sikap?.mSikapSosialDitunjukkanId,
                                sikapsosial
                              )}{" "}
                              dengan baik. Namun sikap{" "}
                              {checkKeteranganSikap(
                                d?.user?.sikap?.mSikapSosialDitingkatkanId,
                                sikapsosial
                              )}{" "}
                              masih perlu ditingkatkan lagi .
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
                                  onClick={() =>
                                    onClickEditSosial(d?.user?.sikap)
                                  }
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalTambahSikapSosial"
                                >
                                  <a className="dropdown-item">
                                    <FaPen className="me-2" />
                                    <span>Edit</span>
                                  </a>
                                </li>
                                <li
                                  onClick={() =>
                                    handleDeleteSikapSosial(d?.user?.id)
                                  }
                                >
                                  <a className="dropdown-item color-danger">
                                    <FaTrashAlt className="me-2" />
                                    <span>Hapus</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {d?.user?.sikap?.mSikapSpiritualDitingkatkanId == null &&
                    d?.user?.sikap?.mSikapSpiritualDitunjukkanId == null && (
                      <a
                        className="color-primary w-100 p-3 px-4 border-top-0 border-bottom-0 border-end-0 mb-1 fw-semibold d-flex align-items-center btn-tambah-table"
                        style={{
                          borderColor: `#92BFF5`,
                          borderWidth: "10px",
                          borderStyle: "solid",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#modalTambahSikapSpiritual"
                        onClick={() => onClickTambah(d)}
                      >
                        <FaPlus className="me-2" /> Tambah Sikap Spiritual
                      </a>
                    )}
                  {d?.user?.sikap?.mSikapSosialDitingkatkanId == null &&
                    d?.user?.sikap?.mSikapSosialDitunjukkanId == null && (
                      <a
                        className="color-primary w-100 p-3 px-4 border-top-0 border-bottom-0 border-end-0 mb-1 fw-semibold d-flex align-items-center btn-tambah-table"
                        style={{
                          borderColor: `#92BFF5`,
                          borderWidth: "10px",
                          borderStyle: "solid",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#modalTambahSikapSosial"
                        onClick={() => onClickTambah(d)}
                      >
                        <FaPlus className="me-2" /> Tambah Sikap Sosial
                      </a>
                    )}
                </li>
              );
            })}
          </ul>
        </div>
        <ModalTambahSikapSpiritual
          sikapspiritual={sikapspiritual}
          handleChangeFormCheck={handleChangeFormCheck}
          formData={formData}
          _postSikapSpiritual={_postSikapSpiritual}
        />
        <ModalTambahSikapSosial
          sikapsosial={sikapsosial}
          handleChangeFormCheck={handleChangeFormCheck}
          formData={formData}
          _postSikapSosial={_postSikapSosial}
        />
      </div>
    </>
  );
};

export default DaftarSikap;
