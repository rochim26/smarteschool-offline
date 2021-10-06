export const checkStatusSikapDinilai = (data) => {
  switch (data) {
    case 1:
      return "Sudah Dinilai";
    default:
      return "Belum Dinilai";
  }
};
