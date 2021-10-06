import client from "./ApiClient";

export const getCamera = () => {
  return client("cameras");
};

export const postCamera = (body) => {
  return client("cameras", {
    method: "POST",
    body: body,
  });
};

export const putCamera = (id, body) => {
  return client(`cameras/${id}`, {
    method: "PUT",
    body: body,
  });
};

export const deleteCamera = (id) => {
  return client(`cameras/${id}`, {
    method: "DELETE",
  });
};
