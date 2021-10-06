import { useEffect, useState } from "react";
import { FaLink, FaPaperclip } from "react-icons/fa";
import { toast } from "react-toastify";
import { postBuktiPelaksanaanSanksi, updateBuktiPelaksanaanSanksi } from "../../client/TataTertibClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import EmptyStateFile from "../Shared/EmptyState/EmptyStateFile";
import InputFile from "../Shared/InputFile/InputFile";
import LabelStatus from "../Shared/LabelStatus/LabelStatus"
import ModalTautanLink from "../Shared/ModalTautanLink/ModalTautanLink";
import TautanCard from "../Shared/TautanCard/TautanCard"

const AccordionSanksi = ({
  namaSiswa,
  namaSanksi,
  keterangan,
  tanggal,
  tindakLanjut,
  lampiran,
  link,
  index,
  showStatusSanksi,
  sanksiPelanggaranId,
  buktiId,
  bukti=null,
  _getDetailSiswa,
  withButtonKonfirmasi=true
}) => {

  console.log("")

  const { user } = useUser();
  const initial = {
    mSanksiSiswaId: sanksiPelanggaranId,
    lampiran: [],
    link: []
  }
  const [buktiPelaksanaanSanksi, setBuktiPelaksanaanSanksi] = useState(initial);

  const removeLampiran = (deleteIndex) => {
    const newLampiran = [...buktiPelaksanaanSanksi.lampiran];
    newLampiran.splice(deleteIndex, 1);
    setBuktiPelaksanaanSanksi({
      ...buktiPelaksanaanSanksi,
      lampiran: newLampiran
    })
  }

  const handleChangeInputFile = (e, data) => {
    if (data) {
      setBuktiPelaksanaanSanksi({
        ...buktiPelaksanaanSanksi,
        lampiran: [...buktiPelaksanaanSanksi.lampiran, data],
      });
    }
  }

  const removeLink = (deleteIndex) => {
    const newLink = [...buktiPelaksanaanSanksi.link];
    newLink.splice(deleteIndex, 1);
    setBuktiPelaksanaanSanksi({
      ...buktiPelaksanaanSanksi,
      link: newLink
    })
  }

  const handleChangeTautanLink = (e, link) => {
    setBuktiPelaksanaanSanksi({
      ...buktiPelaksanaanSanksi,
      link: [...buktiPelaksanaanSanksi.link, link]
    })
  }

  const sendBuktiPelaksanaanSanksi = async () => {
    const { data } = await postBuktiPelaksanaanSanksi(buktiPelaksanaanSanksi, user?.id);
    if (data) {
      toast.success(data?.message);
      _getDetailSiswa();
    }
  }

  const _updateBuktiPelaksanaanSanksi = async (konfirmasi) => {
    const { data } = await updateBuktiPelaksanaanSanksi({ konfirmasi: konfirmasi ? 1 : "0", mSanksiSiswaId: sanksiPelanggaranId }, bukti?.id);
    if (data) {
      toast.success(data?.message);
      _getDetailSiswa();
    }
  }

  useEffect(() => {
    if (bukti !== null) {
      setBuktiPelaksanaanSanksi({
        ...buktiPelaksanaanSanksi,
        lampiran: bukti.lampiran,
        link: bukti.link
      })
    } else {
      setBuktiPelaksanaanSanksi(initial);
    }
  }, [bukti])

  return (
    <div className="card card-ss card-biaya-pendaftaran p-0">
      <div className="card-header-ss rounded-ss px-4 py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-bold color-dark">
              {namaSiswa}
            </h4>
            {
              !showStatusSanksi
                ? (
                  <div className="d-flex align-items-center">
                    <div className="bg-danger rounded-circle shadow-danger-ss me-3" style={{ width: 10, height: 10 }} />
                    <p className="mb-0 color-dark">{namaSanksi}</p>
                  </div>
                ) : <>
                  { bukti?.konfirmasi === 1
                    ? (
                      <div className="d-flex align-items-center">
                        <img src="/img/icon-checklist.svg" />
                        <p className="color-primary mb-0 ms-2"> Selesai</p>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <img src="/img/icon-warning-red.svg" />
                        <p className="color-danger mb-0 ms-2"> Belum Selesai</p>
                      </div>
                    )
                  }
                </>
            }
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <span
              class="d-flex justify-content-center align-items-center shadow-primary-ss rounded-circle p-1 shadow-primary-ss bg-primary"
              style={{ width: "40px", height: "40px" }}
            >
              <img
                className="dropdown"
                src="/img/arrow-bottom.svg"
                alt=""
              />
            </span>
          </a>
        </div>
      </div>
      <div class="collapse" id="collapseExample">
        <hr className="mb-4 mt-0" />
        <div class="card-body card-footer-ss pb-4 px-4 pt-0">
          <div className="bg-light-gray-rgb px-3 py-4 rounded-ss-top-left rounded-ss-top-right">
            <h5 className="fw-bold color-dark mb-0">
              Informasi Sanksi
            </h5>
          </div>
          <div className="bg-very-soft-secondary rounded-ss-bottom-left rounded-ss-bottom-right px-3 py-4">
            
            <div className="mb-4">
              <h6 className="fw-semibold color-dark fs-18-ss">Keterangan</h6>
              <p className="fs-16-ss fw-light mb-0">
                {keterangan}
              </p>
            </div>

            <div className="mb-4">
              <h6 className="fw-semibold color-dark fs-18-ss">Tanggal</h6>
              <p className="fs-16-ss fw-light mb-0">
                {momentPackage(tanggal).format("dddd, DD MMMM YYYY")}
              </p>
            </div>

            <div className="mb-4">
              <h6 className="fw-semibold color-dark fs-18-ss">Tindak Lanjut</h6>
              <p className="fs-16-ss fw-light mb-0">
                {tindakLanjut || "-"}
              </p>
            </div>

            <div className="mb-0">
              <h6 className="fw-semibold color-dark fs-18-ss">Lampiran</h6>
              <div className="d-flex align-items-center w-100">
                { lampiran?.map(lam => <TautanCard noMargin wrapperClass="w-50" type="file" label={lam} withDeleteButton={false} />)}
              </div>
            </div>
          </div>
        </div>

        <div class="card-body card-footer-ss pb-4 px-4 pt-0">
          <div className="bg-light-gray-rgb px-3 py-4 rounded-ss-top-left rounded-ss-top-right">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="fw-bold color-dark mb-0">
                Bukti Pelaksanaan Sanksi
              </h5>
            </div>
          </div>
          <div className="bg-very-soft-secondary rounded-ss-bottom-left rounded-ss-bottom-right px-3 py-4">
            { user?.role === "siswa" && (
              <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mb-4">
                <h5 className="color-dark">Unggah bukti pelaksanaan berupa surat pernyataan atau lainnya.</h5>
                <div className="d-flex justify-content-between flex-column flex-md-row">
                  <label
                    htmlFor="lampiranAccordionSanksi"
                    className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-14-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                  >
                    <FaPaperclip className="me-2" />
                    <p className="mb-0">Unggah File</p>
                  </label>
                  <InputFile
                    accept="file/*"
                    name="lampiran"
                    id="lampiranAccordionSanksi"
                    onChange={handleChangeInputFile}
                  />
                  <button
                    type="button"
                    className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-14-ss fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target={`#ModalTautanLinkAccordionSanksi-${index}`}
                  >
                    <FaLink className="me-2" />
                    Tautan Link
                  </button>
                </div>
                <ModalTautanLink
                  toastMessage="Link berhasil ditambahkan"
                  name="lampiran"
                  modalId={`ModalTautanLinkAccordionSanksi-${index}`}
                  // defaultValue={formData.lampiran}
                  getLink={(e, link) => handleChangeTautanLink(e, link)}
                />
              </div>
            )}
            <div className="mb-0">
              <div className="d-flex align-items-center w-100">
                { buktiPelaksanaanSanksi?.lampiran?.length > 0 && buktiPelaksanaanSanksi?.lampiran?.map((lamp, index) => <TautanCard key={index} noMargin wrapperClass="w-50 me-4" type="file" label={lamp} withDeleteButton onClickDelete={() => removeLampiran(index)} />)}
                { buktiPelaksanaanSanksi?.link?.length > 0 && buktiPelaksanaanSanksi?.link?.map((link, index) => <TautanCard key={index} noMargin wrapperClass="w-50" type="link" label={link} withDeleteButton onClickDelete={() => removeLink(index)} />)}
              </div>
              { buktiPelaksanaanSanksi?.lampiran?.length === 0 && buktiPelaksanaanSanksi?.link?.length === 0 && (
                <EmptyStateFile
                  type="file"
                  pesan="Tidak ada file atau link yang dilampirkan"
                />
              )}
            </div>
          </div>
        </div>

        { user?.role === "siswa" && <>
          <hr />
          <div className="text-center pb-4">
            <p className="color-dark fw-bold">Pastikan bukti pelaksanaan yang diberikan sesuai dengan sanksi.</p>
            <button className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold" onClick={() => sendBuktiPelaksanaanSanksi()} disabled={bukti?.konfirmasi === 1}>
              Kirim Bukti Pelaksanaan Sanksi
            </button>
          </div>
        </>}

        { user?.role === "guru" && withButtonKonfirmasi && <>
          <hr />
          <div className="text-center pb-4">
            <p className="color-dark fw-bold">Pastikan sanksi yang diberikan kepada siswa sudah dilaksanakan dan diselesaikan.</p>
            <div className="d-flex align-items-center justify-content-center">
              <button className="btn btn-outline-danger btn-outline-danger-ss rounded-pill px-4 fw-bold me-3" disabled={!bukti?.id} onClick={() => _updateBuktiPelaksanaanSanksi(false)}>
                Tolak Pelaksanaan Sanksi
              </button>
              <button className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold" onClick={() => _updateBuktiPelaksanaanSanksi(true)} disabled={!bukti?.id}>
                Konfirmasi Pelaksanaan Sanksi
              </button>
            </div>
          </div>
        </>}
      </div>
    </div>
  )
}

export default AccordionSanksi;