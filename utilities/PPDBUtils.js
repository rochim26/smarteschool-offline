export const checkGelombang = (data) => {
  switch (data) {
    case "Akan Dibuka":
      return "jalur-akan-dibuka border border-2 border-success-ss rounded-ss p-4 mb-4 w-100 position-relative";
    case "Sudah Ditutup":
      return "jalur-ditutup border border-2 border-danger-s s rounded-ss p-4 mb-4 w-100 position-relative";
    default:
      return "jalur-dibuka border border-2 rounded-ss p-4 mb-4 w-100 position-relative pointer";
  }
};

export const checkStatusGelombang = (data) => {
  switch (data) {
    case "Daftar":
      return "Terdaftar";
    case "Sudah Ditutup":
      return "Sudah Ditutup";
    case "Akan Dibuka":
      return "Akan Dibuka";
    default:
      return "jalur-dibuka border border-2 border-success-ss rounded-ss p-4 mb-4 w-100 position-relative";
  }
};

export const checkIconGelombang = (data) => {
  switch (data) {
    case "Daftar":
      return "/img/icon-jalur-terdaftar.svg";
    case "Sudah Ditutup":
      return "/img/icon-jalur-ditutup.svg";
    case "Akan Dibuka":
      return "/img/icon-jalur-akandibuka.svg";
    default:
      return "/img/icon-jalur-dibuka.svg";
  }
};

export const checkLabelGelombang = (data) => {
  switch (data) {
    case "Daftar":
      return "bg-success rounded-pill text-white d-flex justify-content-center align-items-center fs-12-ss fw-bold position-absolute";
    case "Sudah Ditutup":
      return "bg-danger rounded-pill text-white d-flex justify-content-center align-items-center fs-12-ss fw-bold position-absolute";
    case "Akan Dibuka":
      return "bg-primary rounded-pill text-white d-flex justify-content-center align-items-center fs-12-ss fw-bold position-absolute";
    default:
      return "bg-success rounded-pill text-white d-flex justify-content-center align-items-center fs-12-ss fw-bold position-absolute";
  }
};

export const checkJadwalJalurGelombang = (data) => {
  switch (data) {
    case "Daftar":
      return "rounded-circle shadow-primary-ss bg-primary border border-3 border-white me-2";
    case "Sudah Ditutup":
      return "rounded-circle shadow-danger-ss bg-danger border border-3 border-white me-2";
    default:
      return "rounded-circle shadow-success-ss bg-success border border-3 border-white me-2";
  }
};

export const infoGelombang = (data) => {
  switch (data) {
    case "Sudah Ditutup":
      return "Gelombang sudah ditutup";
    case "Akan Dibuka":
      return "Gelombang belum dibuka";
    default:
      return null;
  }
};

export const statusKonfirmasi = (biayaPendaftaran, dataPendaftar) => {
  if (dataPendaftar?.diverifikasi) {
    <span className="label-ss bg-success text-white rounded-pill text-center mt-4 mt-lg-0">
      Sudah Diverifikasi
    </span>;
  } else if (biayaPendaftaran == 0 && dataPendaftar?.mJurusan1Id) {
    return (
      <span className="label-ss bg-danger text-white rounded-pill text-center mt-4 mt-lg-0">
        Butuh Konfirmasi
      </span>
    );
  } else if (dataPendaftar?.nominal) {
    return (
      <span className="label-ss bg-danger text-white rounded-pill text-center mt-4 mt-lg-0">
        Butuh Konfirmasi
      </span>
    );
  } else {
    return (
      <span className="label-ss bg-primary text-white rounded-pill text-center mt-4 mt-lg-0">
        Tahap Pengisian Data
      </span>
    );
  }
};
