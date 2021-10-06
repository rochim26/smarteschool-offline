import Link from "next/link"
import { useRouter } from "next/router";
import { ssURL } from "../../client/clientAxios";
import AnimatePage from "../Shared/AnimatePage/AnimatePage"

const CardBukuKunjungan = () => {

  const router = useRouter();

  const listFilterMenu = [
    {
      text: "Pengajuan",
      url: `${ssURL}/konsultasi?menu=buku-kunjungan&filter=pengajuan`
    },
    {
      text: "Diterima",
      url: `${ssURL}/konsultasi?menu=buku-kunjungan&filter=diterima`
    },
    {
      text: "Ditolak",
      url: `${ssURL}/konsultasi?menu=buku-kunjungan&filter=ditolak`
    },
    {
      text: "Selesai",
      url: `${ssURL}/konsultasi?menu=buku-kunjungan&filter=selesai`
    },
  ];

  const isActive = (current) => {
    if (router.query.filter === undefined && current.includes("pengajuan")) { // if filter is undefined set active menu to -> pengajuan
      return true
    } else {
      return current.includes(router.query.filter)
    }
  }

  return (
    <AnimatePage>
      <div className="card-body p-0 bg-white py-2 px-3 rounded-ss">
        <h2 className="color-dark fw-black mb-2">
          <img src="/img/icon-buku-absen.svg" />
          Buku Kunjungan
        </h2>
        <div className="row mt-4">
          <div className="col-md-8 pe-2">
            <div className="status-info p-3 pb-md-3 pb-0 bg-soft-primary rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-md-start justify-content-between">
              <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                <p className="fs-14-ss color-secondary mb-2">
                  Pengajuan
                </p>
                <p className="fs-18-ss fw-bold color-dark m-0">
                  0 Siswa
                </p>
              </div>
              <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                <p className="fs-14-ss color-secondary mb-2">
                  Diproses
                </p>
                <p className="fs-18-ss fw-bold color-dark m-0">
                  0 Siswa
                </p>
              </div>
              <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                <p className="fs-14-ss color-secondary mb-2">
                  Ditolak
                </p>
                <p className="fs-18-ss fw-bold color-dark m-0">
                  0 Siswa
                </p>
              </div>
              <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                <p className="fs-14-ss color-secondary mb-2">
                  Selesai
                </p>
                <p className="fs-18-ss fw-bold color-dark m-0">
                  0 Siswa
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 ps-2">
            <div className="btn btn-primary btn-primary-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4 h-100">
              <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row ">
                <img
                  src="/img/icon-rekap-pembayaran.svg"
                  alt="icon-rekap-pembayaran"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
                <p className="m-0 text-white fw-bold px-lg-4 px-md-0 px-4 py-lg-0 py-md-2 py-0">
                  Rekap Kunjungan
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-very-soft-secondary mt-3 py-4 px-3" style={{ margin: "0 -16px -8px -16px", overflow: "hidden" }}>
          <div style={{ display: "inline-flex", gap: "48px" }}>
            { listFilterMenu.map((menu, index) => (
              <Link href={menu.url}>
                <a>
                  <h6 className={`${isActive(menu.url) ? "color-primary" : "color-secondary"} fw-bold`}>{menu.text}</h6>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AnimatePage>
  )
}

export default CardBukuKunjungan;