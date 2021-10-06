export const checkStatusLunas = (pembayaran, isAdmin) => {
  const totalSudahBayar = pembayaran?.riwayat?.reduce(
    (a, b) => a + parseInt(b.nominal),
    0
  );
  const nominal = pembayaran?.rombelPembayaran?.pembayaran?.nominal;
  if (totalSudahBayar < nominal) {
    return "Belum Lunas";
  } else {
    if (pembayaran?.riwayat?.some((item) => !item.dikonfirmasi)) {
      if (isAdmin) {
        return "Belum Dikonfirmasi";
      } else {
        return `${
          pembayaran?.riwayat?.filter((item) => !item.dikonfirmasi).length
        } Transaksi Belum dikonfirmasi Admin`;
      }
    } else {
      return "Sudah Lunas";
    }
  }
};

export const styleStatusLunas = (pembayaran) => {
  const totalSudahBayar = pembayaran?.riwayat?.reduce(
    (a, b) => a + parseInt(b.nominal),
    0
  );
  const nominal = pembayaran?.rombelPembayaran?.pembayaran?.nominal;
  if (totalSudahBayar < nominal) {
    return "px-4 py-1 rounded-pill fw-bold fs-14-ss bg-soft-danger color-danger";
  } else {
    if (pembayaran?.riwayat?.some((item) => !item.dikonfirmasi)) {
      return `px-4 py-1 rounded-pill fw-bold fs-14-ss bg-soft-warning color-warning`;
    } else {
      return "px-4 py-1 rounded-pill fw-bold fs-14-ss bg-soft-success color-success";
    }
  }
};

export const getTotalSaldo = (grafik) => {
  return (
    grafik
      ?.filter((item) => item.tipe == "kredit")
      ?.reduce((a, b) => a + parseInt(b.nominal), 0) -
    grafik
      ?.filter((item) => item.tipe == "debit")
      ?.reduce((a, b) => a + parseInt(b.nominal), 0)
  )
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getTotalPemasukan = (grafik) => {
  return grafik
    ?.filter((item) => item.tipe == "kredit")
    ?.reduce((a, b) => a + parseInt(b.nominal), 0)
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getTotalPengeluaran = (grafik) => {
  return grafik
    ?.filter((item) => item.tipe == "debit")
    ?.reduce((a, b) => a + parseInt(b.nominal), 0)
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
