import Link from "next/link";
import React, { useState } from "react";
import { FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import ModalKeteranganEkstrakurikuler from "./ModalKeteranganEkstrakurikuler";
import { postRaporEkskul, editRaporEkskul } from "../../client/RaporClient";
import { hideModal } from "../../utilities/ModalUtils";
import { toast } from "react-toastify";

const DaftarEkstrakurikuler = ({
  keterangan,
  getDetailRombelData,
  kelasRombel,
  rombel_id,
}) => {
  // const { user } = useUser();
  const initialStateForm = {
    id: "",
    keterangan: "",
    ekskul_id: "",
    btnBio: "idle",
  };
  const [formData, setFormData] = useState({
    ...initialStateForm,
  });

  const _postRaporEkskul = async () => {
    setFormData({ ...formData, btnBio: "loading" });
    const { data, error } = formData.active
      ? await editRaporEkskul(
          {
            keterangan: formData.keterangan,
          },
          formData.ekskul_id,
          rombel_id
        )
      : await postRaporEkskul(
          {
            keterangan: formData.keterangan,
          },
          formData.id,
          rombel_id
        );

    if (data) {
      setFormData({ ...formData, btnBio: "success" });
      getDetailRombelData();
      hideModal("modalKeteranganEkstrakurikuler");
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
      if (!data?.user?.raporEkskul.length) {
        setFormData({
          id: data?.user?.id,
          keterangan: "",
        });
      } else {
        setFormData({
          id: data?.user?.raporEkskul?.[0]?.mUserId,
          keterangan: data?.user?.raporEkskul?.[0]?.keterangan,
          ekskul_id: data?.user?.raporEkskul?.[0]?.id,
          active: "active",
        });
      }
    }
  };

  return (
    <>
      <div className="card card-ss">
        <div className="card-header p-4 card-header-ss">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
              Daftar Ekstrakurikuler Siswa
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
                  <th className="text-md-center" text-start>
                    Kelas
                  </th>
                  <th className="text-md-center" text-start>
                    Kelulusan
                  </th>
                  <th className="text-md-center" text-start>
                    Keterangan
                  </th>
                </tr>
              </thead>
              {keterangan?.map((d, idx) => {
                return (
                  <tbody>
                    <tr>
                      <td data-th="No">{idx + 1}</td>
                      <td data-th="Nama">
                        <span className="fw-semibold">{d?.user?.nama}</span>
                      </td>
                      <td data-th="Catatan">
                        <span className="color-dark text-md-center text-start fw-semibold">
                          {kelasRombel}
                        </span>
                      </td>
                      <td
                        data-th="Kelulusan"
                        className="text-md-center"
                        text-start
                      >
                        {!d?.user?.raporEkskul.length ? (
                          <span className="label-ss rounded-pill bg-soft-danger color-danger fs-12-ss fw-semibold text-capitalize">
                            Belum Diberikan
                          </span>
                        ) : (
                          <span className="label-ss rounded-pill bg-soft-success color-success fs-12-ss fw-semibold text-capitalize">
                            Sudah Diberikan
                          </span>
                        )}
                      </td>
                      <td
                        data-th="Kelulusan"
                        className="text-md-center"
                        text-start
                      >
                        <a
                          className="bg-primary rounded-pill text-white justify-content-center align-items-center fw-semibold px-4 py-1 fs-14-ss shadow-primary-ss hover-shadow-none"
                          data-bs-toggle="modal"
                          data-bs-target="#modalKeteranganEkstrakurikuler"
                          onClick={() => onClickEdit(d)}
                        >
                          Detail
                        </a>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
      <ModalKeteranganEkstrakurikuler
        handleChangeForm={handleChangeForm}
        formData={formData}
        _postRaporEkskul={_postRaporEkskul}
      />
    </>
  );
};

export default DaftarEkstrakurikuler;
