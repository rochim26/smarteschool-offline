import client from "./ApiClient";

export const getAlurPPDB = () => {
  return client("alur-ppdb");
};

export const detailAlurPPDB = (id) => {
  return client(`alur-ppdb/${id}`);
};

export const postAlurPPDB = (payload) => {
  return client("alur-ppdb", {
    method: "POST",
    body: payload,
  });
};

export const editAlurPPDB = (id, payload) => {
  return client(`alur-ppdb/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteAlurPPDB = (id) => {
  return client(`alur-ppdb/${id}`, {
    method: "DELETE",
  });
};
