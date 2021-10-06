import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import AsyncSelect from "react-select/async";
import { getMasterSekolah } from "../../client/SekolahClient";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SearchKolaborasi = ({ _getUser, isProyek, cariPartner: cari }) => {
  const { user } = useUser();
  const [collapseOpen, setcollapseOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: cari,
    bentuk: "",
    sekolah: "",
  });
  const [sekolah, setSekolah] = useState([]);

  // fetch
  const _getMasterSekolah = async (nama = "", bentuk) => {
    const { data, error } = await getMasterSekolah({
      search: nama,
      bentuk: bentuk,
    });

    if (data) {
      const listSekolah = data?.sekolah?.data?.map((item) => {
        return {
          value: item.id,
          label: item.sekolah,
        };
      });
      setSekolah(listSekolah);
      return listSekolah;
    } else {
      toast.error(error.message);
    }
  };

  // fetch end

  // load options
  const loadNewSekolah = async (input) => {
    const listSekolah = await _getMasterSekolah(input, formData.bentuk);
    return listSekolah;
  };

  // load options end

  // effects
  useEffect(() => {
    _getMasterSekolah();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="search-illustasi-kolaborasi rounded-ss bg-soft-primary p-5 position-relative d-flex mb-4 flex-md-row flex-column">
            <div className="search-illustasi-kolaborasi-content">
              <h2 className="fw-extrabold color-dark text-capitalize mb-2">
                {isProyek ? "Cari Proyek" : "Cari Partner"}
              </h2>
              <h6 className="color-secondary mb-4 fs-18-ss">
                {isProyek
                  ? "Temukan dan gabung dengan proyek yang sesuai dengan bidang anda"
                  : "Cari dan temukan orang yang cocok dijadikan partner untuk berkolaborasi dengan anda"}
              </h6>
            </div>
            <img
              src={`${
                isProyek
                  ? "/img/illustrasi-proyek-kolaborasi.png"
                  : "/img/illustrasi-partner-kolaborasi.png"
              }`}
              alt="illustrasi-kolaborasi"
              className="search-illustrasi-kolaborasi-img img-fluid"
            />
            <div
              className={`search-form row position-absolute ${
                collapseOpen && "show"
              }`}
            >
              <div
                className="col-sm-12 d-flex flex-column"
                data-joyride="cari-buku"
              >
                <div
                  className={`card card-ss card-search-form ${
                    collapseOpen && "show"
                  }`}
                >
                  <form>
                    {isProyek ? (
                      <input
                        type="text"
                        className="form-control form-search-perpustakaan fs-5 fw-bold ms-4 pe-sm-0 pe-4"
                        placeholder="Cari Proyek..."
                        autoComplete="off"
                        name="cariProyek"
                        onClick={() => setcollapseOpen(true)}
                        value={formData.nama}
                        onChange={(e) => {
                          setFormData(e.target.value);
                        }}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control form-search-perpustakaan fs-5 fw-bold ms-4 pe-sm-0 pe-4"
                        placeholder="Cari Partner atau skill yang dibutuhkan..."
                        autoComplete="off"
                        name="cariPartner"
                        onClick={() => setcollapseOpen(true)}
                        value={formData.nama}
                        onChange={(e) => {
                          setFormData(e.target.value);
                        }}
                      />
                    )}

                    <button type="submit" className="d-none" onClick="">
                      Cari
                    </button>
                    <div
                      className={`pencarian-detail p-4 pt-0 ${
                        collapseOpen && "show"
                      }`}
                    >
                      <hr className="mb-3 mt-0" />
                      <h4 className="fs-14-ss fw-extrabold color-dark mb-4">
                        Pencarian Lebih Detail
                      </h4>
                      <div className="row mb-4">
                        {isProyek ? (
                          <>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Provinsi
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-search-filter-perpus fs-6"
                                  z
                                  placeholder="Cari provinsi..."
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Kota / Kabupaten
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-search-filter-perpus fs-6"
                                  placeholder="Cari kota / kabupaten..."
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Kecamatan
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-search-filter-perpus fs-6"
                                  placeholder="Cari kecamatan..."
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Jenjang Sekolah
                                </label>
                                <select
                                  className="form-select fs-6"
                                  aria-label="Default select example"
                                  id="jenjangSekolah"
                                  // value={stateFormProfil?.gender}
                                  // onChange={(e) =>
                                  //   handleChangeProfil(e)
                                  // }
                                >
                                  <option hidden>Pilih jenjang sekolah</option>
                                  <option value="SMP">SMP</option>
                                  <option value="SMA">SMA</option>
                                  <option value="SMK">SMK</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Nama Sekolah
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-search-filter-perpus fs-6"
                                  placeholder="Cari nama sekolah..."
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Status Pengerjaan
                                </label>
                                <select
                                  className="form-select fs-6"
                                  aria-label="Default select example"
                                  id="jenjangSekolah"
                                  // value={stateFormProfil?.gender}
                                  // onChange={(e) =>
                                  //   handleChangeProfil(e)
                                  // }
                                >
                                  <option hidden>Pilih jenjang sekolah</option>
                                  <option value="Perencanaan Produk">
                                    Perencanaan Produk
                                  </option>
                                  <option value="Menyusun Jadwal">
                                    Menyusun Jadwal
                                  </option>
                                  <option value="Pengembangan Produk">
                                    Pengembangan Produk
                                  </option>
                                  <option value="Menguji Hasil">
                                    Menguji Hasil
                                  </option>
                                  <option value="Evaluasi Pengalaman Belajar">
                                    Evaluasi Pengalaman Belajar
                                  </option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Jenjang Sekolah
                                </label>
                                <select
                                  className="form-select fs-6"
                                  aria-label="Default select example"
                                  id="jenjangSekolah"
                                  // value={stateFormProfil?.gender}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      bentuk: e.target.value,
                                    })
                                  }
                                >
                                  <option hidden>Pilih jenjang sekolah</option>
                                  <option value="SMP">SMP</option>
                                  <option value="SMA">SMA</option>
                                  <option value="SMK">SMK</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Nama Sekolah
                                </label>
                                <AsyncSelect
                                  type="text"
                                  placeholder="Cari nama sekolah..."
                                  value={formData.sekolah}
                                  onChange={(value) =>
                                    setFormData({ ...formData, sekolah: value })
                                  }
                                  defaultOptions={sekolah}
                                  loadOptions={loadNewSekolah}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Jurusan
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-search-filter-perpus fs-6"
                                  placeholder="Cari jurusan..."
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Provinsi
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-search-filter-perpus fs-6"
                                  z
                                  placeholder="Cari provinsi..."
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Kota / Kabupaten
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-search-filter-perpus fs-6"
                                  placeholder="Cari kota / kabupaten..."
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="form-label fs-6">
                                  Kecamatan
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-search-filter-perpus fs-6"
                                  placeholder="Cari kecamatan..."
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <hr className="mt-2 mt-4" />
                      <div className="d-flex align-items-md-center justify-content-between search-form-button flex-md-row flex-column">
                        <span className="color-primary fw-bold mb-md-0 mb-3 text-center">
                          100 Pencarian
                        </span>
                        <div className="ms-md-auto d-flex flex-sm-row flex-column justify-content-between">
                          <button
                            type="button"
                            className="btn btn-secondary mb-sm-0 mb-3"
                          >
                            Reset Filter
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary ms-sm-3"
                            onClick={() => setcollapseOpen(false)}
                          >
                            {isProyek ? "Cari Proyek" : "Cari Partner"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`backdrop-search-kolaborasi ${collapseOpen && "show"}`}
        onClick={() => setcollapseOpen(false)}
      ></div>
    </>
  );
};

export default SearchKolaborasi;
