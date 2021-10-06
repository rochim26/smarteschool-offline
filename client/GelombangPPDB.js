import client from "./ApiClient";

export const getGelombangPPDB = (params) => {
  return client("gelombang-ppdb", { params });
};

export const detailGelombangPPDB = (id) => {
  return client(`gelombang-ppdb/${id}`);
};

export const postGelombangPPDB = (payload) => {
  return client("gelombang-ppdb", {
    method: "POST",
    body: payload,
  });
};

export const downloadGelombangPPDB = (payload) => {
  return client("ppdb/downloadgelombang", {
    method: "POST",
    body: payload,
  });
};

export const editGelombangPPDB = (id, payload) => {
  return client(`gelombang-ppdb/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteGelombangPPDB = (id) => {
  return client(`gelombang-ppdb/${id}`, {
    method: "DELETE",
  });
};
