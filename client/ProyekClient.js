import client from "./ApiClient";

export const getProyek = (params) => {
  return client("proyek", { params });
};

export const detailProyek = (id) => {
  return client(`proyek/${id}`);
};

export const getKategoriPekerjaan = (id) => {
  return client(`proyek/${id}/kategori-pekerjaan`);
};

export const postProyek = (payload) => {
  return client("proyek", {
    method: "POST",
    body: payload,
  });
};

export const editProyek = (id, payload) => {
  return client(`proyek/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteProyek = (id) => {
  return client(`proyek/${id}`, {
    method: "DELETE",
  });
};

export const postProyekForum = (id, payload) => {
  return client(`proyek/forum/${id}`, {
    method: "POST",
    body: payload,
  });
};

// kategori pekerjaan service
export const postKategoriPekerjaan = (payload) => {
  return client("kategori-pekerjaan", {
    method: "POST",
    body: payload,
  });
};

export const putKategoriPekerjaan = (id, payload) => {
  return client(`kategori-pekerjaan/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteKategoriPekerjaan = (id) => {
  return client(`kategori-pekerjaan/${id}`, {
    method: "DELETE",
  });
};

export const postAnggotaProyek = (payload) => {
  return client("anggota-proyek", {
    method: "POST",
    body: payload,
  });
};

export const putAnggotaProyek = (id, payload) => {
  return client(`anggota-proyek/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteAnggotaProyek = (id) => {
  return client(`anggota-proyek/${id}`, {
    method: "DELETE",
  });
};

export const postPekerjaanProyek = (payload, id) => {
  return client(`pekerjaan-proyek/${id}`, {
    method: "POST",
    body: payload,
  });
};

export const putPekerjaanProyek = (payload, id) => {
  return client(`pekerjaan-proyek/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deletePekerjaanProyek = (id) => {
  return client(`pekerjaan-proyek/${id}`, {
    method: "DELETE",
  });
};
