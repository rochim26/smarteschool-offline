import client from "./ApiClient";

export const getMapel = (params) => {
  return client("mata-pelajaran", { params });
};