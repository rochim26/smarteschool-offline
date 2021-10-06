import client from "./ApiClient";

export const getRekap = () => {
  return client("rekap");
};

export const detailRekap = (id) => {
  return client(`rekap/${id}`);
};

export const rekapMateri = (id, materi_id, params) => {
  return client(`rekap/${id}/${materi_id}`, { params });
};

export const postRekap = (payload, id) => {
  return client(`rekap/${id}`, {
    method: "POST",
    body: payload,
  });
};

export const postRekapRombel = (payload, id, materi_id) => {
  return client(`rekap/${id}/${materi_id}`, {
    method: "POST",
    body: payload,
  });
};
export const editRekapRombel = (
  payload,
  materi_id,
  rekap_id,
  rekap_rombel_id
) => {
  return client(`rekap/${materi_id}/${rekap_id}/${rekap_rombel_id}`, {
    method: "PUT",
    body: payload,
  });
};

export const postRekapSikap = (payload, rombel_id, id, mapel_id) => {
  return client(`rombel/${rombel_id}/${id}/${mapel_id}`, {
    method: "POST",
    body: payload,
  });
};

export const editRekap = (id, sub_id, payload) => {
  return client(`rekap/${id}/${sub_id}`, {
    method: "PUT",
    body: payload,
  });
};

export const getRekapRombelNilai = (id) => {
  return client(`rekap-nilai/${id}`);
};

export const editRekapNilai = (id, user_id, payload) => {
  return client(`rekap/materi_id/${id}/ubah/${user_id}`, {
    method: "PUT",
    body: payload,
  });
};

export const editTemplateDeskripsi = (id, payload) => {
  return client(`rekap-template/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteRekap = (id, sub_id) => {
  return client(`rekap/${id}/${sub_id}`, {
    method: "DELETE",
  });
};

export const deleteRekapRombel = (id) => {
  return client(`rekap/materi_id/rekap_id/${id}`, {
    method: "DELETE",
  });
};

export const downloadRekapRombel = (id) => {
  return client(`download/rekap-rombel/${id}`, {
    method: "POST",
  });
};
