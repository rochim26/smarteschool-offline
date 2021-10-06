import { FaCheck, FaFile } from "react-icons/fa";
import { currencyFormatter, momentPackage } from "../../utilities/HelperUtils";

const CardRiwayatTransaksi = ({
  isTerkonfirmasi = false,
  riwayat,
  isAdmin = false,
  _konfirmasiPendaftarPPDB,
}) => {
  return (
    <div className="rounded-ss border border-light-secondary-ss px-4 py-3 bg-white">
      <div className="d-flex align-items-md-center justify-content-between mb-3 flex-md-row flex-column">
        <span className="fw-bold color-dark mb-md-0 mb-3">
          {riwayat?.bank} - {riwayat?.norek} a/n {riwayat?.namaPemilik}
        </span>
        <span className="fw-bold color-primary">
          +{currencyFormatter(riwayat?.nominal)}
        </span>
      </div>
      <a
        href={riwayat?.bukti}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-soft-primary p-3 rounded-ss mb-3 pointer d-block"
      >
        <div className="file-content d-flex align-items-center flex-wrap">
          <div
            className="rounded-circle bg-primary shadow-primary-ss d-flex justify-content-center align-items-center text-white fs-3 p-2"
            style={{
              width: "48px",
              height: "48px",
            }}
          >
            <FaFile />
          </div>
          <div className="p-3 d-flex flex-column">
            <p className="fw-bold color-dark mb-0">File Bukti Pembayaran</p>
          </div>
        </div>
      </a>
      <hr className="my-3" />
      <div className="d-flex align-items-sm-center justify-content-between flex-sm-row flex-column">
        <span className="mb-sm-0 mb-3">
          {momentPackage(riwayat?.createdAt).format("dddd, DD MMMM YYYY")}
        </span>
        <div className="d-flex">
          <div
            className={`label-ss px-4 fw-bold rounded-pill fs-14-ss text-center me-2 ${
              isTerkonfirmasi
                ? "bg-soft-success color-success"
                : "bg-light-primary color-primary"
            }`}
          >
            {isTerkonfirmasi ? "Terkonfirmasi" : "Menunggu Konfirmasi"}
          </div>
          {isAdmin && (
            <button
              className="btn-success btn-success-ss px-4 rounded-pill d-flex align-items-center"
              onClick={_konfirmasiPendaftarPPDB}
            >
              Konfirmasi <FaCheck className="ms-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardRiwayatTransaksi;
