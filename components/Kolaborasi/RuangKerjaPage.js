import { DatePicker, Select, Tooltip } from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import React, { useState } from "react";
import { FaCheck, FaFilter, FaPlus, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  deleteKategoriPekerjaan,
  deletePekerjaanProyek,
} from "../../client/ProyekClient";
import { db } from "../../config/config";
import useUser from "../../hooks/useUser";
import Avatar from "../Shared/Avatar/Avatar";
import TableRuangKerja from "./TableRuangKerja";

const { RangePicker } = DatePicker;

const RuangKerjaPage = ({
  id,
  roles,
  isAnggota,
  jobs,
  anggota,
  myRole,
  pekerjaan,
  kategori,
  checkPermission,
  // formData,
  setFormData,
  handleChangeForm,
}) => {
  const proyekRef = db.collection("kolaborasi").doc(`${id}`);
  const { user } = useUser();

  const [search, setSearch] = useState({
    text: "",
    status: [],
    prioritas: [],
    batasWaktu: [],
    anggotaId: [],
    jobdesk: [],
  });

  const postNewLog = (message) => {
    proyekRef.collection("logs").doc().set({
      message: message,
      by: user.nama,
      tanggal: moment().toDate(),
    });
  };

  const _deleteKategoriPekerjaan = async (kategori) => {
    if (checkPermission("Delete_Kategori")) {
      const { data, error } = await deleteKategoriPekerjaan(
        kategori.kategori_id
      );

      if (data) {
        postNewLog(`kategori pekerjaan ${kategori.namaKategori} dihapus`);
        proyekRef
          .collection("kategori")
          .doc(`${kategori.kategori_id}`)
          .delete();
        toast.success(data?.message);
      } else {
        toast.error(error?.message);
      }
    } else {
      toast.error("Tidak Diizinkan");
    }
  };

  const _deletePekerjaanProyek = async (id, kategori_id) => {
    const { data, error } = await deletePekerjaanProyek(id);

    if (data) {
      const temp = kategori?.find((d) => d.id == kategori_id);
      const index = temp?.pekerjaan?.indexOf(id);
      temp.pekerjaan.splice(index, 1);
      const payload = temp.pekerjaan;
      postNewLog(`pekerjaan ${pekerjaan[id].judul} dihapus`);
      proyekRef.collection("kategori").doc(`${kategori_id}`).update({
        pekerjaan: payload,
      });
      proyekRef.collection("pekerjaan").doc(`${id}`).delete();
      toast.success(data?.message);
    } else {
      toast.error(error?.message);
    }
  };

  const [collapseOpen, setcollapseOpen] = useState(false);

  // const [kategoriPekerjaan, setKategoriPekerjaan] = useState({});
  // const { kategori } = kategoriPekerjaan;

  // useEffect(() => {
  //   _getKategoriPekerjaan();
  // }, []);

  const setAnggotaId = (d) => {
    const index = search?.anggotaId?.findIndex((value) => value == d.id);
    if (index >= 0) {
      setSearch({
        ...search,
        anggotaId: [...search.anggotaId.filter((value) => value !== d.id)],
      });
    } else {
      setSearch({
        ...search,
        anggotaId: [...search.anggotaId, d.id],
      });
    }
  };
  return (
    <>
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card card-ss p-4">
            <div className="d-flex align-items-lg-center flex-lg-row flex-column">
              {/* Search Start */}

              <div className="flex-grow-1 me-lg-4 mb-lg-0 mb-3">
                <input
                  type="text"
                  className="form-control form-search form-search-mutasi form-search-tunggakan rounded-pill fw-semibold border-secondary-ss w-100"
                  style={{ height: "42px", width: "100%" }}
                  id="exampleFormControlInput1"
                  value={search.text}
                  onChange={(event) =>
                    setSearch({ ...search, text: event.target.value })
                  }
                  placeholder="Cari..."
                />
              </div>

              {/* Search End */}

              {/* Button Filter Ditugaskan Start */}

              <div
                className="dropdown dropdown-ss d-flex flex-sm-row flex-column"
                data-joyride="dropdown-tunggakan"
              >
                <button
                  className={`dropdown-search-perpustakaan-toggle dropdown-toggle-secondary dropdown-sort-perpus-toggle btn py-2 px-4 btn-link rounded-pill border bg-white fw-bold text-decoration-none color-secondary w-100 me-lg-3 mb-lg-0 mb-3`}
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser className="me-2 mb-1" />
                  Ditugaskan
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-ss my-1"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li
                    className="pointer dropdown-item"
                    onClick={() =>
                      setSearch({
                        ...search,
                        anggotaId: [],
                      })
                    }
                  >
                    <p className="fs-16-ss mb-0 fw-bold">Semua</p>
                  </li>
                  {anggota?.map((d) => {
                    return (
                      <li
                        className="pointer dropdown-item"
                        onClick={() => {
                          setAnggotaId(d);
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center  w-75">
                            <Avatar
                              name={d.user.nama}
                              size={30}
                              className="me-3"
                            />
                            <Tooltip title={`${d.user.nama}`}>
                              <p className="fs-16-ss mb-0 fw-bold text-truncate">
                                {d.user.nama}
                              </p>
                            </Tooltip>
                          </div>
                          {search?.anggotaId.indexOf(d.id) >= 0 && (
                            <FaCheck className="color-primary" />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Button Filter Ditugaskan End */}

              {/* Button Filter Start */}

              <button
                className={`btn py-2 px-4 btn-collapse-filter btn-light rounded-pill border bg-white color-secondary fw-bold me-lg-3 mb-lg-0 mb-3 ${
                  collapseOpen && "active"
                }`}
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={() => setcollapseOpen(!collapseOpen)}
                style={{ zIndex: "1" }}
              >
                <FaFilter className="me-3" />
                Filter
              </button>
              {/* Button Filter End */}

              {/* Button Buat Kategori Start */}
              {checkPermission("Buat_Kategori") ? (
                <button
                  className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#modalBuatKategori"
                  // onClick={() => setInitialFormData()}
                  data-joyride="btn-buat-jadwal"
                >
                  <FaPlus className="me-2" />
                  Buat Kategori
                </button>
              ) : (
                ""
              )}

              {/* Button Buat Kategori End */}
            </div>
          </div>
        </div>
      </div>

      {/* Collapse Filter Start */}

      <div className="collapse" id="collapseExample">
        <div className="row mb-4 gy-4">
          <div className="col-lg-4 col-md-6">
            <label className="form-label ">Prioritas</label>
            <Select
              className="select-filter-proyek"
              mode="multiple"
              value={search.prioritas}
              //   options={anggotaRombelOptions}
              placeholder="Pilih Prioritas"
              style={{ width: "100%" }}
              onChange={(e) => setSearch({ ...search, prioritas: e })}
              maxTagCount="responsive"
            >
              <Option value="Rendah">Rendah</Option>
              <Option value="Sedang">Sedang</Option>
              <Option value="Tinggi">Tinggi</Option>
            </Select>
          </div>
          <div className="col-lg-4 col-md-6">
            <label className="form-label ">Status</label>
            <Select
              className="select-filter-proyek"
              mode="multiple"
              value={search.status}
              //   options={anggotaRombelOptions}
              placeholder="Pilih Status"
              style={{ width: "100%" }}
              onChange={(e) => setSearch({ ...search, status: e })}
              maxTagCount="responsive"
            >
              <Option value="Baru">Baru</Option>
              <Option value="Menunggu">Menunggu</Option>
              <Option value="Terhambat">Terhambat</Option>
              <Option value="Sedang Dikerjakan">Sedang Dikerjakan</Option>
              <Option value="Sudah Dikerjakan">Sudah Dikerjakan</Option>
              <Option value="Selesai">Selesai</Option>
            </Select>
          </div>
          <div className="col-lg-4 col-md-6">
            <label className="form-label ">Jobdesk</label>
            <Select
              className="select-filter-proyek"
              mode="multiple"
              value={search.jobdesk}
              //   options={anggotaRombelOptions}
              placeholder="Pilih Status"
              style={{ width: "100%" }}
              onChange={(e) => setSearch({ ...search, jobdesk: e })}
              maxTagCount="responsive"
            >
              {jobs?.map((d) => {
                return <Option value={d.id}>{d.name}</Option>;
              })}
            </Select>
          </div>
          <div className="col-lg-4 col-md-6">
            <label className="form-label ">Batas Waktu</label>
            <RangePicker
              className="d-flex align-items-center w-100 date-picker-mutasi bg-transparent rounded-ss text-white"
              style={{
                height: "54px",
                paddingLeft: "14px",
                paddingRight: "14px",
              }}
              placeholder={["Tanggal Mulai", "Tanggal Selesai"]}
              onChange={(date, dateString) =>
                setSearch({ ...search, batasWaktu: dateString })
              }
            />
          </div>
        </div>
      </div>

      {/* Collapse Filter End */}

      <div className="row">
        <div className="col-md-12">
          <div className="card card-ss p-4">
            {kategori ? (
              <TableRuangKerja
                kategori={kategori}
                pekerjaan={pekerjaan}
                handleChangeForm={handleChangeForm}
                setFormData={setFormData}
                proyekRef={proyekRef}
                _deletePekerjaanProyek={_deletePekerjaanProyek}
                _deleteKategoriProyek={_deleteKategoriPekerjaan}
                search={search}
                roles={roles}
                anggota={anggota}
                user={user}
                checkPermission={checkPermission}
              />
            ) : // <></>
            null}
          </div>
        </div>
      </div>
    </>
  );
};

export default RuangKerjaPage;
