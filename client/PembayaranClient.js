import client from "./ApiClient";

export const getPembayaran = (params) => {
  return client("pembayaran", { params });
};

export const detailPembayaran = (id, params) => {
  return client(`pembayaran/${id}`, { params });
};

export const postPembayaran = (body) => {
  return client("pembayaran", {
    method: "POST",
    body,
  });
};

export const updatePembayaran = (body, id) => {
  return client(`pembayaran/${id}`, {
    method: "PUT",
    body,
  });
};

export const deletePembayaran = (id) => {
  return client(`pembayaran/${id}`, {
    method: "DELETE",
  });
};

export const postPembayaranKategori = (params) => {
  return client("pembayaran-kategori", {
    method: "POST",
    body,
  });
};

export const getPembayaranSiswa = (params) => {
  return client("pembayaran-siswa", { params });
};

export const detailPembayaranSiswa = (id, params) => {
  return client(`pembayaran-siswa/${id}`, { params });
};

export const postRiwayatPembayaranSiswa = (body) => {
  return client(`riwayat-pembayaran-siswa`, {
    method: "POST",
    body,
  });
};

export const konfirmasiPembayaranSiswa = (body, id) => {
  return client(`riwayat-pembayaran-siswa/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteRiwayatPembayaran = (id) => {
  return client(`riwayat-pembayaran-siswa/${id}`, {
    method: "DELETE",
  });
};

export const rekapPembayaran = (id) => {
  return client(`pembayaran/${id}/downloadspp`, {
    method: "POST",
  });
};

export const importTemplateSPP = (id, body) => {
  return client(`import/pembayaran-siswa/${id}`, {
    method: "POST",
    body,
  });
};

export const downloadTemplateSPP = (id) => {
  return client(`download/pembayaran-siswa/${id}`, {
    method: "POST",
  });
};
