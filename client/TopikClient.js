import client from "./ApiClient";

export const getTopik = (params) => {
  return client("topik", { params });
};

export const getDetailTopik = (id, params) => {
  return client(`topik/${id}`, { params });
};

export const postTopik = (body) => {
  return client("topik", {
    body,
    method: "POST",
  });
};

export const editTopik = (body, id) => {
  return client(`topik/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteTopik = (id) => {
  return client(`topik/${id}`, {
    method: "DELETE",
  });
};
