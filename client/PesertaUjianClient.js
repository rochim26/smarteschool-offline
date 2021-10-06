import client from "./ApiClient";

export const getDetailPesertaUjian = (id, params) => {
  return client(`peserta-ujian/${id}`, { params });
};

export const postPesertaUjian = (body) => {
  return client("peserta-ujian", {
    method: "POST",
    body,
  });
};

export const editPesertaUjian = (body, id) => {
  return client(`peserta-ujian/${id}`, {
    method: "PUT",
    body,
  });
};

export const editJawabanUjianSiswa = (body, id) => {
  return client(`jawaban-ujian-siswa/${id}`, {
    method: "PUT",
    body,
  });
};
