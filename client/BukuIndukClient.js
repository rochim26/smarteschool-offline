import client from "./ApiClient";

export const getPredikat = (params) => {
  return client("buku-induk", { params });
};

export const getDetailBukuInduk = (id) => {
  return client(`buku-induk/${id}`);
};

export const getRaporBukuInduk = (bukuinduk, id) => {
  return client(`buku-induk/${bukuinduk}/${id}`);
};

export const getRaporSiswa = (rombel_id, id) => {
  return client(`rapor/${rombel_id}/siswa/${id}`);
};

export const getBukuIndukRapor = (id) => {
  return client(`buku-induk/rapor/${id}`);
};

export const postPredikat = (body) => {
  return client("predikat", {
    body,
    method: "POST",
  });
};

export const editPredikat = (body, id) => {
  return client(`predikat/${id}`, {
    method: "PUT",
    body,
  });
};

export const editMapel = (id, body) => {
  return client(`buku-induk/rapor/mapel/${id}`, {
    method: "PUT",
    body,
  });
};

export const postKategori = (id, body) => {
  return client(`buku-induk/rapor/kategori/${id}`, {
    body,
    method: "POST",
  });
};

export const editKategori = (id, body) => {
  return client(`buku-induk/rapor/kategori/${id}`, {
    method: "PUT",
    body,
  });
};
export const deleteKategori = (id) => {
  return client(`buku-induk/rapor/kategori/${id}`, {
    method: "DELETE",
  });
};

export const editKKM = (id, body) => {
  return client(`buku-induk/rapor/kkmAll/${id}`, {
    method: "PUT",
    body,
  });
};

export const deletePredikat = (id) => {
  return client(`predikat/${id}`, {
    method: "DELETE",
  });
};
