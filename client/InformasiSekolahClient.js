import client from "./ApiClient";

export const getInformasiSekolah = (params) => {
  return client("informasi-sekolah", { params });
};

export const updateInformasiSekolah = (payload) => {
  return client(`informasi-sekolah`, {
    method: "PUT",
    body: payload,
  });
};
