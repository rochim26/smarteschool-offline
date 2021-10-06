import Link from "next/link";
import React, { useState } from "react";
import { FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import ModalKeteranganKelulusan from "./ModalKeteranganKelulusan";
import {
  postKeteranganRapor,
  editKeteranganRapor,
} from "../../client/RaporClient";
import { toast } from "react-toastify";
import { hideModal } from "../../utilities/ModalUtils";
import {
  checkKeteranganLulus,
  checkLabelLulus,
} from "../../utilities/RaporUtils";

const DaftarKeteranganKelulusan = ({ keterangan, getDetailRombelData }) => {
  const { user } = useUser();
  const initialStateForm = {
    id: "",
    catatan: "",
    kelulusan: "",
    active: "",
    btnBio: "idle",
  };
  const [formData, setFormData] = useState({
    ...initialStateForm,
  });

  const _postKeteranganKelulusan = async () => {
    setFormData({ ...formData, btnBio: "loading" });

    const { data, error } = formData.active
      ? await editKeteranganRapor(formData.id, {
          catatan: formData.catatan,
          kelulusan: formData.kelulusan,
        })
      : await postKeteranganRapor(
          {
            catatan: formData.catatan,
            kelulusan: formData.kelulusan,
          },
          formData.id
        );

    if (data) {
      setFormData({ ...formData, btnBio: "success" });
      getDetailRombelData();
      hideModal("modalKeteranganKelulusan");
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

  const onClickEdit = (data) => {
    if (data) {
      if (data?.user?.keteranganRapor == null) {
        setFormData({
          id: data?.user?.id,
          catatan: "",
          kelulusan: "",
        });
      } else {
        setFormData({
          id: data?.user?.keteranganRapor?.mUserId,
          catatan: data?.user?.keteranganRapor?.catatan,
          kelulusan: data?.user?.keteranganRapor?.kelulusan,
          active: "active",
        });
      }
    }
  };

  const handleChangeSelect = (e, name) => {
    setFormData({
      ...formData,
      [name]: e?.value,
    });
  };

  return (
    <>
      <div className="card card-ss">
        <div className="card-header p-4 card-header-ss">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
              Daftar Keterangan Kelulusan Siswa
            </h4>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table-ss">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th className="text-md-center text-start">Catatan</th>
                  <th className="text-md-center text-start">Kelulusan</th>
                  <th className="text-md-center text-start">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {keterangan?.map((d, idx) => {
                  return (
                    <tr>
                      <td data-th="No">{idx + 1}</td>
                      <td data-th="Nama">
                        <span className="fw-semibold">{d?.user?.nama}</span>
                      </td>
                      <td
                        data-th="Catatan"
                        className="text-md-center text-start"
                      >
                        {d?.user?.keteranganRapor?.catatan?.length == null &&
                        d?.user?.keteranganRapor?.kelulusan?.length != null ? (
                          <span className="label-ss rounded-pill bg-soft-danger color-danger fs-12-ss fw-semibold text-capitalize">
                            Belum Diberikan
                          </span>
                        ) : !d?.user?.keteranganRapor?.catatan?.length ? (
                          <span className=""> </span>
                        ) : (
                          <span className="label-ss rounded-pill bg-soft-success color-success fs-12-ss fw-semibold text-capitalize">
                            Sudah Diberikan
                          </span>
                        )}
                      </td>
                      <td
                        data-th="Kelulusan"
                        className="text-md-center text-start"
                      >
                        {!d?.user?.keteranganRapor?.kelulusan?.length ? (
                          <span></span>
                        ) : (
                          <span
                            className={checkLabelLulus(
                              d?.user?.keteranganRapor?.kelulusan
                            )}
                          >
                            {d?.user?.keteranganRapor?.kelulusan}
                          </span>
                        )}
                      </td>
                      <td
                        data-th="Kelulusan"
                        className="text-md-center text-start"
                      >
                        <a
                          className="bg-primary rounded-pill text-white justify-content-center align-items-center fw-semibold px-4 py-1 fs-14-ss shadow-primary-ss hover-shadow-none"
                          data-bs-toggle="modal"
                          data-bs-target="#modalKeteranganKelulusan"
                          onClick={() => onClickEdit(d)}
                        >
                          Detail
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalKeteranganKelulusan
        handleChangeForm={handleChangeForm}
        formData={formData}
        _postKeteranganKelulusan={_postKeteranganKelulusan}
        handleChangeSelect={handleChangeSelect}
      />
    </>
  );
};

export default DaftarKeteranganKelulusan;
