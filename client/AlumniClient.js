import client from "./ApiClient";

export const getAlumni = (params) => {
  return client("alumni", { params });
};

export const postAlumni = (payload) => {
  return client("alumni", {
    method: "POST",
    body: payload,
  });
};

export const editAlumni = (payload, id) => {
  return client(`alumni/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteAlumni = (id) => {
  return client(`alumni/${id}`, {
    method: "DELETE",
  });
};
