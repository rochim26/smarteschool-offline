import client from "./ApiClient";

export const getGTK = (params) => {
  return client("guru", { params });
};

export const detailGTK = (id) => {
  return client(`guru/${id}`);
};

export const postGTK = (payload) => {
  return client("guru", {
    method: "POST",
    body: payload,
  });
};

export const editGTK = (id, payload) => {
  return client(`guru/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteGTK = (id) => {
  return client(`guru/${id}`, {
    method: "DELETE",
  });
};
