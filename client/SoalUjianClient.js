import client from "./ApiClient";

export const getSoalUjian = (params) => {
  return client("soal-ujian", { params });
};

export const getDetailSoalUjian = (id, params) => {
  return client(`soal-ujian/${id}`, { params });
};

export const postSoalUjian = (body) => {
  return client("soal-ujian", {
    method: "POST",
    body,
  });
};

export const editSoalUjian = (id, body) => {
  return client(`soal-ujian/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteSoalUjian = (id, body) => {
  return client(`soal-ujian/${id}`, {
    method: "DELETE",
    body,
  });
};
