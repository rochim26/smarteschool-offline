import client from "./ApiClient";

export const getJadwalUjian = (params) => {
  return client("jadwal-ujian", { params });
};

export const getDetailJadwalUjian = (id, params) => {
  return client(`jadwal-ujian/${id}`, { params });
};

export const postJadwalUjian = (body) => {
  return client("jadwal-ujian", {
    method: "POST",
    body,
  });
};

export const downloadJadwalUjian = (body) => {
  return client("jadwal-ujian/download-hasil", {
    method: "POST",
    body,
  });
};

export const editJadwalUjian = (id, body) => {
  return client(`jadwal-ujian/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteJadwalUjian = (id) => {
  return client(`jadwal-ujian/${id}`, {
    method: "DELETE",
  });
};
