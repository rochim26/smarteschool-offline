import client from "./ApiClient";

export const getRaporNilai = (rombel, id) => {
  return client(`rombel/${rombel}/rapor-nilai/${id}`);
};

export const getRaporKeterampilan = (rombel, id) => {
  return client(`rombel/${rombel}/rapor-keterampilan/${id}`);
};

export const getNilaiSiswa = (id, user_id) => {
  return client(`rombel/${id}/nilai/${user_id}`);
};

export const postKeteranganRapor = (body, id) => {
  return client(`rapor/kelulusan/${id}`, {
    body,
    method: "POST",
  });
};

export const editKeteranganRapor = (id, body) => {
  return client(`rapor/kelulusan/${id}`, {
    method: "PUT",
    body,
  });
};

export const postKeteranganPkl = (body, id) => {
  return client(`rapor/pkl/${id}`, {
    body,
    method: "POST",
  });
};

export const postSikapSpiritual = (body, id) => {
  return client(`rapor-sikap/spiritual/${id}`, {
    body,
    method: "POST",
  });
};

export const postSikapSosial = (body, id) => {
  return client(`rapor-sikap/sosial/${id}`, {
    body,
    method: "POST",
  });
};

export const deleteSikapSpiritual = (id) => {
  return client(`rapor-sikap/spiritual/${id}`, {
    method: "DELETE",
  });
};

export const deleteSikapSosial = (id) => {
  return client(`rapor-sikap/sosial/${id}`, {
    method: "DELETE",
  });
};

export const editKeteranganPkl = (id, body) => {
  return client(`rapor/pkl/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteKeteranganPkl = (id) => {
  return client(`rapor/pkl/${id}`, {
    method: "DELETE",
  });
};

export const postRaporEkskul = (body, id, rombel_id) => {
  return client(`rapor/ekskul/${rombel_id}/${id}`, {
    body,
    method: "POST",
  });
};

export const editRaporEkskul = (body, id, rombel_id) => {
  return client(`rapor/ekskul/${rombel_id}/${id}`, {
    body,
    method: "PUT",
  });
};
