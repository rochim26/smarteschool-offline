import { FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa";

export const checkLabelLulus = (data) => {
  switch (data) {
    case "lulus":
      return `label-ss rounded-pill bg-soft-success color-success fs-12-ss fw-semibold text-capitalize`;
    default:
      return `label-ss rounded-pill bg-soft-danger color-danger fs-12-ss fw-semibold text-capitalize`;
  }
};

export const checkKeteranganSikap = (data, sikap) => {
  let dataSikap = [];
  if (data?.length > 1) {
    var dataId = data.split(",");
  } else if (data?.length == 1) {
    var dataId = data;
  }
  for (let i = 0; i < sikap?.length; i++) {
    for (let d = 0; d < dataId.length; d++) {
      if (sikap[i].id == dataId[d]) {
        dataSikap.push(sikap[i].sikap);
      }
    }
  }
  return dataSikap.join(", ");
};

export const checkPredikatKeterampilan = (data, predikat) => {
  for (let i = 0; i < predikat?.length; i++) {
    if (
      data >= predikat[i].bbKeterampilan &&
      data <= predikat[i].baKeterampilan
    ) {
      return predikat[i].predikat;
    }
  }
};

export const checkPredikatPengetahuan = (data, predikat) => {
  for (let i = 0; i < predikat?.length; i++) {
    if (
      data >= predikat[i].bbPengetahuan &&
      data <= predikat[i].baPengetahuan
    ) {
      return predikat[i].predikat;
    }
  }
};

export const checkStatusTuntas = (nilai, kkm) => {
  if (nilai >= kkm) {
    return "Sudah Tuntas";
  } else if (nilai < kkm) {
    return "Belum Tuntas";
  } else {
    return "Belum Dinilai";
  }
};

export const checkStatusTuntasWalas = (data, listKKM, totalMapel) => {
  if (
    data?.user?.meta?.jumlahMapelDikerjakan < totalMapel &&
    data?.user?.meta?.jumlahMapelDikerjakan != 0
  ) {
    return "Sedang Dikerjakan";
  }
  if (data?.user?.nilaiSemuaUjian?.length > 0) {
    const totalDibawah =
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilai == null) {
          return false;
        } else {
          if (
            item?.nilai <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length +
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilaiKeterampilan == null) {
          return false;
        } else {
          if (
            item?.nilaiKeterampilan <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm2
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length;
    if (totalDibawah == 0) {
      return "Sudah Tuntas";
    } else {
      return "Belum Tuntas";
    }
  } else {
    return "Belum Dinilai";
  }
};

export const checkLabelStatusTuntas = (nilai, kkm) => {
  if (nilai >= kkm) {
    return "label-ss bg-soft-success rounded-pill color-success fs-12-ss fw-semibold py-1 px-3";
  } else if (nilai < kkm) {
    return "label-ss bg-soft-danger rounded-pill color-danger fs-12-ss fw-semibold py-1 px-3";
  } else {
    return "label-ss bg-soft-secondary rounded-pill color-secondary fs-12-ss fw-semibold py-1 px-3";
  }
};

export const checkLabelStatusTuntasWalas = (data, listKKM, totalMapel) => {
  if (
    data?.user?.meta?.jumlahMapelDikerjakan < totalMapel &&
    data?.user?.meta?.jumlahMapelDikerjakan != 0
  ) {
    return "label-ss bg-soft-warning rounded-pill color-warning fs-12-ss fw-semibold py-1 px-3";
  }
  if (data?.user?.nilaiSemuaUjian?.length > 0) {
    const totalDibawah =
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilai == null) {
          return false;
        } else {
          if (
            item?.nilai <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length +
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilaiKeterampilan == null) {
          return false;
        } else {
          if (
            item?.nilaiKeterampilan <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm2
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length;
    if (totalDibawah == 0) {
      return "label-ss bg-soft-success rounded-pill color-success fs-12-ss fw-semibold py-1 px-3";
    } else {
      return "label-ss bg-soft-danger rounded-pill color-danger fs-12-ss fw-semibold py-1 px-3";
    }
  } else {
    return "label-ss bg-soft-secondary rounded-pill color-secondary fs-12-ss fw-semibold py-1 px-3";
  }
};

export const jumlahNilaiDibawah = (data, listKKM) => {
  if (data?.user?.nilaiSemuaUjian?.length > 0) {
    const totalDibawah =
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilai == null) {
          return false;
        } else {
          if (
            item?.nilai <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length +
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilaiKeterampilan == null) {
          return false;
        } else {
          if (
            item?.nilaiKeterampilan <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm2
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length;
    return `${totalDibawah} Nilai`;
  } else {
    return;
  }
};

export const checkStatusLihatRapor = (data, listKKM, totalMapel) => {
  if (
    data?.user?.meta?.jumlahMapelDikerjakan < totalMapel &&
    data?.user?.meta?.jumlahMapelDikerjakan != 0
  ) {
    return "Sedang Dikerjakan";
  }
  if (data?.user?.nilaiSemuaUjian?.length > 0) {
    const totalDibawah =
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilai == null) {
          return false;
        } else {
          if (
            item?.nilai <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length +
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilaiKeterampilan == null) {
          return false;
        } else {
          if (
            item?.nilaiKeterampilan <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm2
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length;
    if (totalDibawah == 0) {
      return "Sudah Tuntas";
    } else {
      return "Belum Tuntas";
    }
  } else {
    return "Menunggu";
  }
};

export const checkIconLihatRapor = (data, listKKM, totalMapel) => {
  if (
    data?.user?.meta?.jumlahMapelDikerjakan < totalMapel &&
    data?.user?.meta?.jumlahMapelDikerjakan != 0
  ) {
    return <FaClock color="#F9AC50" className="fs-5" />;
  }
  if (data?.user?.nilaiSemuaUjian?.length > 0) {
    const totalDibawah =
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilai == null) {
          return false;
        } else {
          if (
            item?.nilai <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length +
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilaiKeterampilan == null) {
          return false;
        } else {
          if (
            item?.nilaiKeterampilan <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm2
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length;
    if (totalDibawah == 0) {
      return <FaCheckCircle color="#2680EB" className="fs-5" />;
    } else {
      return <FaExclamationCircle color="#FC544B" className="fs-5" />;
    }
  } else {
    return <FaClock color="#80849C" className="fs-5" />;
  }
};

export const checkLabelStatusLihatRapor = (data, listKKM, totalMapel) => {
  if (
    data?.user?.meta?.jumlahMapelDikerjakan < totalMapel &&
    data?.user?.meta?.jumlahMapelDikerjakan != 0
  ) {
    return "color-warning rounded-pill fs-14-ss fw-bold ms-2";
  }
  if (data?.user?.nilaiSemuaUjian?.length > 0) {
    const totalDibawah =
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilai == null) {
          return false;
        } else {
          if (
            item?.nilai <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length +
      data?.user?.nilaiSemuaUjian?.filter((item) => {
        if (item?.nilaiKeterampilan == null) {
          return false;
        } else {
          if (
            item?.nilaiKeterampilan <
            listKKM.find(
              (kkm) => kkm.mMataPelajaranId == item?.mMataPelajaranId
            )?.kkm2
          ) {
            return true;
          } else {
            return false;
          }
        }
      })?.length;
    if (totalDibawah == 0) {
      return "color-primary rounded-pill fs-14-ss fw-bold ms-2";
    } else {
      return "color-danger rounded-pill fs-14-ss fw-bold ms-2";
    }
  } else {
    return "color-sceondary rounded-pill fs-14-ss fw-bold ms-2";
  }
};

export const checkLabelDibawahKKM = (
  keterampilan,
  pengetahuan,
  nilaiUjian,
  totalMapel,
  totalDikerjakan
) => {
  if (!nilaiUjian) {
    return "d-none";
  } else if (totalDikerjakan < totalMapel) {
    return "d-none";
  } else if (totalDikerjakan == totalMapel) {
    if (keterampilan + pengetahuan == 0) {
      return "label-ss bg-soft-success rounded-pill color-success fs-12-ss fw-semibold py-1 px-3";
    } else if (keterampilan + pengetahuan != 0) {
      return "label-ss bg-soft-danger rounded-pill color-danger fs-12-ss fw-semibold py-1 px-3";
    }
  }
};

export const checkDibawahKKM = (keterampilan, pengetahuan) => {
  if (keterampilan + pengetahuan == 0) {
    return "0";
  } else {
    return keterampilan + pengetahuan;
  }
};

export const ubahAngkaKeHuruf = (num) => {
  var ones = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];
  var tens = [
    "",
    "",
    "dua puluh",
    "tiga puluh",
    "empat puluh",
    "lima puluh",
    "enam puluh",
    "tujuh puluh",
    "delapan puluh",
    "sembilan puluh",
  ];
  var teens = [
    "sepuluh",
    "sebelas",
    "dua belas",
    "tiga belas",
    "empat belas",
    "lima belas",
    "enam belas",
    "tujuh belas",
    "delapan belas",
    "sembilan belas",
  ];
  function convert_tens(num) {
    if (num < 10) return ones[num];
    else if (num >= 10 && num < 20) return teens[num - 10];
    else {
      return tens[Math.floor(num / 10)] + " " + ones[num % 10];
    }
  }
  if (num > 99) {
    return ones[Math.floor(num / 100)] + " hundred " + convert_tens(num % 100);
  } else {
    return convert_tens(num);
  }
};

export const getDeskripsiPengetahuan = (
  mapel,
  predikat,
  rekapMaxPengetahuan,
  rekapMinPengetahuan
) => {
  const data = mapel?.mataPelajaran?.nilaiIndividu?.nilai;
  const template = mapel?.mataPelajaran?.templateDeskripsi;
  if (
    !mapel?.mataPelajaran?.nilaiIndividu?.nilai ||
    !predikat ||
    !rekapMaxPengetahuan ||
    !rekapMinPengetahuan
  ) {
    return "-";
  } else {
    for (let i = 0; i < predikat?.length; i++) {
      if (
        data >= predikat[i].bbPengetahuan &&
        data <= predikat[i].baPengetahuan
      ) {
        const deskripsi = template?.find(
          (item) =>
            item.predikat.predikat == predikat[i].predikat &&
            item.tipe == "Pengetahuan"
        );
        if (rekapMaxPengetahuan?.id == rekapMinPengetahuan?.id) {
          return `${deskripsi?.prolog} ${rekapMaxPengetahuan.judul}`;
        } else {
          return `${deskripsi?.prolog} ${rekapMaxPengetahuan.judul}. ${deskripsi?.epilog} ${rekapMinPengetahuan.judul}`;
        }
      }
    }
  }
};

export const getDeskripsiKeterampilan = (
  mapel,
  predikat,
  rekapMaxKeterampilan,
  rekapMinKeterampilan
) => {
  const data = mapel?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan;
  const template = mapel?.mataPelajaran?.templateDeskripsi;
  if (
    !mapel?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan ||
    !predikat ||
    !rekapMaxKeterampilan ||
    !rekapMinKeterampilan
  ) {
    return "-";
  } else {
    for (let i = 0; i < predikat?.length; i++) {
      if (
        data >= predikat[i].bbKeterampilan &&
        data <= predikat[i].baKeterampilan
      ) {
        const deskripsi = template?.find(
          (item) =>
            item.predikat.predikat == predikat[i].predikat &&
            item.tipe == "Keterampilan"
        );
        if (rekapMaxKeterampilan?.id == rekapMinKeterampilan?.id) {
          return `${deskripsi?.prolog} ${rekapMaxKeterampilan.judul}`;
        } else {
          return `${deskripsi?.prolog} ${rekapMaxKeterampilan.judul}. ${deskripsi?.epilog} ${rekapMinKeterampilan.judul}`;
        }
      }
    }
  }
};

export const getDeskripsiSikapSosial = (sikap, template, sikapsosial) => {
  if (!sikap) {
    return "Belum Dinilai";
  } else {
    const sikapDitunjukkan = sikapsosial?.filter(
      (d) =>
        sikap?.mSikapDitunjukkanId
          ?.split(",")
          .findIndex((item) => parseInt(item) == d.id) >= 0
    );
    const sikapDitingkatkan = sikapsosial?.filter(
      (d) =>
        sikap?.mSikapDitingkatkanId
          ?.split(",")
          .findIndex((item) => parseInt(item) == d.id) >= 0
    );
    const prolog = template?.find((item) => item.tipe == "Sikap")?.prolog;
    const epilog = template?.find((item) => item.tipe == "Sikap")?.epilog;
    return `${
      sikapDitunjukkan.length > 0 &&
      `${prolog} ${sikapDitunjukkan.map((d) => d.sikap).join(", ")}`
    }. ${
      sikapDitingkatkan.length > 0 &&
      `${epilog} ${sikapDitingkatkan.map((d) => d.sikap).join(", ")}`
    }`;
  }
};

export const getStyleTableRow = (nilai, kkm) => {
  if (nilai != null) {
    if (nilai < kkm) {
      return {
        backgroundColor: "#fef5f4",
        color: "#fc544b",
      };
    }
  } else {
    return {};
  }
};

export const getWarnaNilai = (nilai, kkm) => {
  if (nilai >= kkm) {
    return "primary";
  } else {
    return "danger";
  }
};
