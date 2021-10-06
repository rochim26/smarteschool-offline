import client from "./ApiClient";

export const getKontak = (params) => {
  return client("kontak", { params });
};

export const updateKontak = (payload) => {
  return client(`kontak`, {
    method: "PUT",
    body: payload,
  });
};