import client from "./ApiClient";

export const getBab = () => {
  return client("bab");
};

export const getDetailBab = (id) => {
  return client(`bab/${id}`);
};

export const postBab = (payload) => {
  return client("bab", {
    method: "POST",
    body: payload,
  });
};

export const editBab = (id, payload) => {
  return client(`bab/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteBab = (id) => {
  return client(`bab/${id}`, {
    method: "DELETE",
  });
};
