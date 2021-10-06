import client from "./ApiClient";

export const getTa = () => {
  return client("ta");
};

export const postTa = (payload) => {
  return client("ta", {
    method: "POST",
    body: payload,
  });
};

export const editTa = (id, payload) => {
  return client(`ta/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteTa = (id) => {
  return client(`ta/${id}`, {
    method: "DELETE",
  });
};
