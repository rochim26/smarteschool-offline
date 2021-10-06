export const checkBackgroundKelompok = (data) => {
  switch (data) {
    case "C":
      return {
        background: "url('/img/bg-rekap-produktif.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      };
    default:
      return {
        background: "url('/img/bg-rekap-normatif.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      };
  }
};

export const checkLabelTeknikPenilaian = (data) => {
  switch (data) {
    case "praktik":
      return `bg-soft-primary rounded-pill color-primary fs-12-ss fw-semibold py-1 px-3`;
    case "produk":
      return `bg-soft-warning rounded-pill color-warning fs-12-ss fw-semibold py-1 px-3`;
    case "proyek":
      return `bg-soft-success rounded-pill color-success fs-12-ss fw-semibold py-1 px-3`;
    case "portofolio":
      return `bg-soft-danger rounded-pill color-danger fs-12-ss fw-semibold py-1 px-3`;
    default:
      return `bg-soft-primary rounded-pill color-primary fs-12-ss fw-semibold py-1 px-3`;
  }
};

export const checkLabelSiswa = (data) => {
  switch (data) {
    case "C":
      return `background: "url('/img/bg-rekap-produktif.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",`;
    default:
      return `background: "url('/img/bg-rekap-normatif.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",`;
  }
};
export const checkStatusSikapDinilai = (data) => {
  switch (data) {
    case 1:
      return "Sudah Dinilai";
    default:
      return "Belum Dinilai";
  }
};

export const checkLabelSikapDinilai = (data) => {
  switch (data) {
    case 1:
      return `bg-soft-success rounded-pill color-success fs-12-ss fw-semibold py-1 px-3`;
    default:
      return `bg-soft-danger rounded-pill color-danger fs-12-ss fw-semibold py-1 px-3`;
  }
};

export const checkLabelStatusTuntas = (kkm, nilai) => {
  switch (true) {
    case nilai < kkm:
      return `label-ss bg-soft-danger rounded-pill color-danger fs-12-ss fw-semibold py-1 px-3`;
    case nilai >= kkm:
      return `label-ss bg-soft-success rounded-pill color-success fs-12-ss fw-semibold py-1 px-3`;
  }
};

export const checkStatusTuntas = (kkm, nilai) => {
  switch (true) {
    case nilai < kkm:
      return "Belum Tuntas";
    case nilai >= kkm:
      return "Sudah Tuntas";
  }
};
