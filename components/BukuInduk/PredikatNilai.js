import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import Avatar from "react-avatar";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import { ssURL } from "../../client/clientAxios";
import ModalTambahPredikatNilai from "./ModalTambahPredikatNilai";
import {
  getPredikat,
  postPredikat,
  deletePredikat,
  editPredikat,
} from "../../client/BukuIndukClient";
import { toast } from "react-toastify";
import { hideModal } from "../../utilities/ModalUtils";

const PredikatNilaiPage = ({}) => {
  const initialStateForm = {
    predikat: "",
    bbPengetahuan: "",
    baPengetahuan: "",
    bbKeterampilan: "",
    baKeterampilan: "",
    sikap: "",
    btnLoading: "idle",
  };
  const [predikatData, setPredikatData] = useState({});
  const { predikat } = predikatData;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialStateForm);

  const _getPredikat = async () => {
    setLoading(true);
    const { data } = await getPredikat();
    if (data) {
      setPredikatData(data);
    }
    setLoading(false);
  };

  const _deletePredikat = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deletePredikat(id);
        if (data) {
          toast.success(data?.message);
          _getPredikat();
        } else {
          toast.error(error?.message);
        }
      }
    });
  };

  const _postPredikatNilai = async () => {
    setFormData({ ...formData, btnBio: "loading" });

    const { data, error } = formData.id
      ? await editPredikat(
          {
            predikat: formData.predikat,
            bb_pengetahuan: formData.bbPengetahuan,
            ba_pengetahuan: formData.baPengetahuan,
            bb_keterampilan: formData.bbKeterampilan,
            ba_keterampilan: formData.baKeterampilan,
            sikap: formData.sikap,
          },
          formData.id
        )
      : await postPredikat({
          predikat: formData.predikat,
          bb_pengetahuan: formData.bbPengetahuan,
          ba_pengetahuan: formData.baPengetahuan,
          bb_keterampilan: formData.bbKeterampilan,
          ba_keterampilan: formData.baKeterampilan,
          sikap: formData.sikap,
        });
    if (data) {
      setFormData({ ...formData, btnBio: "success" });
      _getPredikat();
      hideModal("modalTambahPredikatNilai");
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
  const _editProyek = async () => {
    setFormData({ ...formData, btnLoading: "loading" });
    const { data } = await editProyek(formData?.id, formData);

    if (data) {
      toast.success(data?.message);
      hideModal("modalBuatProyek");
      setFormData({ ...formData, btnLoading: "success" });
      setFormData(initialStateForm);
      _getPredikat();
    } else {
      toast.error(data?.message);
      setFormData({ ...formData, btnLoading: "error" });
    }
  };

  const onClickEdit = (data) => {
    if (data) {
      setFormData({
        id: data.id,
        predikat: data.predikat,
        bbPengetahuan: data.bbPengetahuan,
        baPengetahuan: data.baPengetahuan,
        bbKeterampilan: data.bbKeterampilan,
        baKeterampilan: data.baKeterampilan,
        sikap: data.sikap,
      });
    }
  };
  useEffect(() => {
    _getPredikat();
  }, []);
  return (
    <>
      <div className="row">
        <div className="card card-ss p-0 pb-4">
          <div className="p-4">
            <h4 className="fw-extrabold color-dark mb-0">Data Predikat</h4>
          </div>
          {loading && <Skeleton count={3} height={50} />}
          {!loading && (
            <table className="table-ss">
              <thead>
                <tr>
                  <th
                    style={{ width: "10%" }}
                    rowSpan="2"
                    className="border border-white border-3 border-start-0 border-top-0 border-end-0"
                  >
                    Predikat
                  </th>
                  <th
                    style={{ width: "25%", height: "40px" }}
                    colSpan="2"
                    className="text-center border border-white border-3 p-2"
                  >
                    Pengetahuan
                  </th>
                  <th
                    style={{ width: "25%", height: "40px" }}
                    colSpan="2"
                    className="text-center border border-white border-3 p-2 border-end-0"
                  >
                    Keterampilan
                  </th>
                  <th
                    style={{ width: "15%" }}
                    rowSpan="2"
                    className="text-center border border-white border-3 p-2 border-end-0"
                  >
                    Sikap
                  </th>
                  <th
                    style={{ width: "5%" }}
                    rowSpan="2"
                    className="border border-white border-3 border-start-0 border-end-0"
                  ></th>
                </tr>

                <tr>
                  <th
                    className="text-center border border-white border-3 border-end-0 p-2"
                    style={{ height: "40px" }}
                  >
                    Batas Bawah
                  </th>
                  <th
                    className="text-center border border-white border-3 border-start-0 border-top-0 border-end-0 p-2"
                    style={{ height: "40px" }}
                  >
                    Batas Atas
                  </th>
                  <th
                    className="text-center border border-white border-3  border-end-0 p-2"
                    style={{ height: "40px" }}
                  >
                    Batas Bawah
                  </th>
                  <th
                    className="text-center border border-white border-3 border-start-0 border-top-0 border-end-0 p-2"
                    style={{ height: "40px" }}
                  >
                    Batas Atas
                  </th>
                </tr>
              </thead>
              <tbody>
                {predikat?.map((d) => {
                  return (
                    <tr>
                      <td
                        data-th="Predikat"
                        className="text-md-center text-start"
                      >
                        <span className="fw-semibold text-center text-uppercase text-uppercase">
                          {d?.predikat}
                        </span>
                      </td>
                      <td
                        data-th="Batas Bawah Pengetahuan"
                        className="text-md-center text-start"
                      >
                        <span className="fw-semibold color-dark">
                          {d?.bbPengetahuan}
                        </span>
                      </td>
                      <td
                        data-th="Batas Atas Pengetahuan"
                        className="text-md-center text-start"
                      >
                        <span className="fw-semibold color-dark">
                          {d?.baPengetahuan}
                        </span>
                      </td>
                      <td
                        data-th="Batas Atas Keterampilan"
                        className="text-md-center text-start"
                      >
                        <span className="fw-semibold color-dark">
                          {d?.bbKeterampilan}
                        </span>
                      </td>
                      <td
                        data-th="Batas Bawah Keterampilan"
                        className="text-md-center text-start"
                      >
                        <span className="fw-semibold color-dark">
                          {d?.baKeterampilan}
                        </span>
                      </td>
                      <td
                        data-th="Predikat"
                        className="text-md-center text-start"
                      >
                        <span className="fw-semibold color-dark ">
                          {d?.sikap}
                        </span>
                      </td>
                      <td>
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
                              data-bs-target="#modalTambahPredikatNilai"
                            >
                              <a className="dropdown-item">
                                <FaPen className="me-2" />
                                <span>Edit</span>
                              </a>
                            </li>
                            <li onClick={() => _deletePredikat(d?.id)}>
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
          )}
          {/* <a
            className="color-primary w-100 p-3 px-4 border-top-0 border-bottom-0 border-end-0 mb-1 fw-semibold d-flex align-items-center btn-tambah-table"
            style={{
              borderColor: `#92BFF5`,
              borderWidth: "10px",
              borderStyle: "solid",
            }}
            data-bs-toggle="modal"
            data-bs-target="#modalTambahPredikatNilai"
          >
            <FaPlus className="me-2" /> Tambah
          </a> */}
        </div>
      </div>
      <ModalTambahPredikatNilai
        formData={formData}
        handleChangeForm={handleChangeForm}
        _postPredikatNilai={_postPredikatNilai}
      />
    </>
  );
};

export default PredikatNilaiPage;
