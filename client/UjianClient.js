import client from "./ApiClient";

export const getUjian = (params) => {
  return client("ujian", { params });
};

export const getDetailUjian = (id, params) => {
  return client(`ujian/${id}`, { params });
};

export const postUjian = (body) => {
  return client("ujian", {
    method: "POST",
    body,
  });
};

export const downloadKartuSoal = (id) => {
  return client(`ujian/download-kartu-ujian/${id}`, {
    method: "POST",
  });
};

export const editUjian = (id, body) => {
  return client(`ujian/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteUjian = (id) => {
  return client(`ujian/${id}`, {
    method: "DELETE",
  });
};
