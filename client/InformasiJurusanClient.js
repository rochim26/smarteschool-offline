import client from "./ApiClient";

export const getInformasiJurusan = (params) => {
  return client("informasi-jurusan", { params });
};

export const updateInformasiJurusan = (payload) => {
  return client(`informasi-jurusan`, {
    method: "PUT",
    body: payload,
  });
};
