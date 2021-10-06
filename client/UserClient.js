import client from "./ApiClient";

export const getUser = (params) => {
  return client("user", { params });
};

export const getDetailUser = (id, params) => {
  return client(`user/${id}`, { params });
};
