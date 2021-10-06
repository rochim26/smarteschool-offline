import client from "./ApiClient";

export const getSurat = (params) => {
  return client("surat", { params });
};

export const detailSurat = (id) => {
  return client(`surat/${id}`);
};

export const postSurat = (payload) => {
  return client("surat", {
    method: "POST",
    body: payload,
  });
};

export const editSurat = (id, payload) => {
  return client(`surat/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const editDisposisi = (id, payload) => {
  return client(`disposisi/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteSurat = (id) => {
  return client(`surat/${id}`, {
    method: "DELETE",
  });
};

export const deleteDisposisi = (id) => {
  return client(`disposisi/${id}`, {
    method: "DELETE",
  });
};

export const postDisposisi = (payload) => {
  return client("disposisi", {
    method: "POST",
    body: payload,
  });
};
