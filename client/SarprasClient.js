import client from "./ApiClient";

export const getSarpras = (params) => {
  return client("sarpras", { params });
};

export const getSarprasDetail = (id, params) => {
  return client(`sarpras/${id}`, { params });
};


export const postSarpras = (body) => {
  return client("sarpras", {
    body,
    method: "POST",
  });
};

export const editSarpras = (id, body) => {
  return client(`sarpras/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteSarpras = (id) => {
  return client(`sarpras/${id}`, {
    method: "DELETE",
  });
};
