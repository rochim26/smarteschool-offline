import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postSoalUjian } from "../../../client/SoalUjianClient";
import { getUjian } from "../../../client/UjianClient";
import { useRouter } from "next/router";
import { hideModal } from "../../../utilities/ModalUtils";
import SkeletonAmbilSoal from "../Skeleton/SkeletonAmbilSoal";
import { Select, Checkbox } from "antd";
import SelectShared from "../SelectShared/SelectShared";

const { Option } = Select;

const ModalAmbilSoal = ({ tingkat, getDetailUjianData }) => {
  const router = useRouter();

  const [daftarSoal, setDaftarSoal] = useState([]);
  const [selectedSoalIds, setSelectedSoalIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ tingkat: [], daftarUjian: [] });

  const handleChangeSelect = (e, name) => {
    setFormData({
      ...formData,
      [name]: e?.value,
    });
  };

  const handleSelectAll = (e) => {
    let soalIds = [];

    daftarSoal?.map((soal) => {
      soalIds.push(soal?.soal?.id);
    });

    if (e.target.checked) {
      setSelectedSoalIds(soalIds);
    } else {
      setSelectedSoalIds([]);
    }
  };

  const handleChangeSoal = (e) => {
    const value = parseInt(e.target.value);

    if (e.target.checked) {
      setSelectedSoalIds([...selectedSoalIds, value]);
    } else {
      setSelectedSoalIds(selectedSoalIds?.filter((id) => id !== value));
    }
  };

  const handlePostSoalUjian = async () => {
    const payload = {
      daftarSoalUjianId: selectedSoalIds,
      mUjianId: router.query.id,
    };

    const { data } = await postSoalUjian(payload);
    if (data) {
      toast.success(data.message);
      getDetailUjianData();
      hideModal("modalAmbilSoal");
    }
  };

  const [listUjian, setListUjian] = useState([]);

  const getDaftarUjian = async () => {
    setLoading(true);
    const params = {
      tingkat: formData.tingkat,
      daftarUjianId: formData.daftarUjian,
    };

    if (!formData.daftarUjian) delete params.daftarUjianId;

    const { data } = await getUjian(params);
    if (data) {
      setListUjian(
        data?.ujianTingkat?.map((d) => ({ label: d.nama, value: d.id })) || []
      );
      setDaftarSoal(data?.ujianDetail?.soalUjian || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formData.tingkat || formData.daftarUjian) {
      getDaftarUjian();
    }
  }, [formData.tingkat, formData.daftarUjian]);

  return (
    <div
      className="modal modal-ss fade"
      id="modalAmbilSoal"
      tabIndex="-1"
      aria-labelledby="modalAmbilSoalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title" id="modalAmbilSoalLabel">
              <h4 className="mb-0 fw-extrabold">Ambil dari Bank Soal</h4>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => hideModal("modalAmbilSoal")}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Tingkat Kelas</label>
                <SelectShared
                  name="tingkat"
                  handleChangeSelect={handleChangeSelect}
                  value={formData.tingkat}
                  options={tingkat}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Daftar Ujian</label>
                <SelectShared
                  name="daftarUjian"
                  handleChangeSelect={handleChangeSelect}
                  value={formData.daftarUjian}
                  options={listUjian}
                />
              </div>
            </div>
            <div className="mb-3">
              <h5 className="fs-18-ss fw-bold color-dark mb-4">
                Daftar Bank Soal
              </h5>
            </div>
            {loading && <SkeletonAmbilSoal count={3} />}
            {!loading &&
              daftarSoal?.map((soal, idx) => (
                <div
                  className="kuis-component form-check-ss position-relative"
                  key={idx}
                >
                  <input
                    className="form-check-input form-check-ambil-soal position-absolute pointer"
                    type="checkbox"
                    id={`checkAmbilSoal-${idx}`}
                    style={{
                      top: "54%",
                      right: "1em",
                      width: "30px",
                      height: "30px",
                    }}
                    value={soal?.soal?.id}
                    checked={selectedSoalIds?.includes(soal?.soal?.id)}
                    onChange={handleChangeSoal}
                  />
                  <div className="kuis-card form-check-label rounded-ss mb-3 border border-secondary border-light-secondary-ss p-3 ">
                    {/* Info Soal Start */}

                    <div className="d-flex justify-content-center align-items-center justify-content-md-start justify-content-between pb-3 border-bottom border-light-secondary-ss">
                      <span
                        className="bg-primary text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center me-auto"
                        style={{
                          width: "75px",
                          height: "25px",
                        }}
                      >
                        {soal?.soal?.nilaiSoal || 0} Poin
                      </span>
                      <span
                        className="outline-primary-ss rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "75px",
                          height: "25px",
                        }}
                      >
                        KD {soal?.soal?.kd}
                      </span>
                      <span
                        className="outline-primary-ss rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center"
                        style={{
                          width: "75px",
                          height: "25px",
                        }}
                      >
                        {soal?.soal?.levelKognitif}
                      </span>
                    </div>
                    {/* Info Soal End */}
                    <div className="d-flex align-items-md-center flex-lg-nowrap flex-md-row flex-column flex-wrap pt-3">
                      <div
                        className="rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fw-extrabold color-dark me-3 p-3"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div className="d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row flex-grow-1 pe-lg-5">
                        <div className="soal-content p-md-1 p-0 m-md-0 mt-3 mb-4">
                          <p
                            className="mb-0 color-secondary pe-3 dangerous-html"
                            dangerouslySetInnerHTML={{
                              __html: soal?.soal?.pertanyaan,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="modal-footer d-flex justify-content-lg-between flex-lg-row flex-column">
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-pill bg-light-primary color-primary fw-bold px-4 py-2 mb-lg-0 me-2">
                {selectedSoalIds?.length || 0} Soal Terpilih
              </div>
              <div className="form-check-ragu-ragu position-relative d-flex flex-column">
                <input
                  className="form-check-input form-check-input-salah me-3 p-2 rounded-circle position-absolute d-inline-block "
                  type="checkbox"
                  id="checkbox-select-all"
                  style={{
                    width: "20px",
                    height: "20px",
                    top: "16%",
                    left: "1em",
                    transition: ".3s",
                  }}
                  onChange={handleSelectAll}
                />
                <label
                  className="form-check-label btn btn-warning btn-warning-ss rounded-pill p-0 d-flex justify-content-center align-items-center fw-bold ps-3"
                  style={{ height: "40px", width: "180px" }}
                  for="checkbox-select-all"
                >
                  Pilih Semua
                </label>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-secondary me-3 mb-lg-0 mb-md-3 mb-0"
                data-bs-dismiss="modal"
                onClick={() => setSelectedSoalIds([])}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-primary mb-lg-0 mb-md-3 mb-0"
                onClick={handlePostSoalUjian}
              >
                Ambil Bank Soal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAmbilSoal;
