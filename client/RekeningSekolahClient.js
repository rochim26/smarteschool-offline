import client from "./ApiClient";

export const getRekeningSekolah = (params) => {
  return client("rek-sekolah", { params });
};

export const updateRekeningSekolah = (body) => {
  return client(`rek-sekolah`, {
    method: "PUT",
    body,
  });
};