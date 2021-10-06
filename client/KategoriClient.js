import client from "./ApiClient";

export const getKategori = (params) => {
  return client("kategori", { params });
};

export const postKategori = (body) => {
  return client("kategori", {
    body,
    method: "POST",
  });
};

export const editKategori = (body, id) => {
  return client(`kategori/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteKategori = (id) => {
  return client(`kategori/${id}`, {
    method: "DELETE",
  });
};
