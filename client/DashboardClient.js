import client from "./ApiClient";

export const getTugas = (params) => {
  return client("dashboard/tugas", { params });
};

export const getAbsen = (params) => {
  return client("dashboard/absen", { params });
};
