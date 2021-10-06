import client from "./ApiClient";

export const getRpp = () => {
  return client("rpp");
};

export const getRppGuru = (id) => {
  return client(`rpp/guru/${id}`);
};

export const getDetailRpp = (id) => {
  return client(`rpp/${id}`);
};

export const postRpp = (payload) => {
  return client("rpp", {
    method: "POST",
    body: payload,
  });
};

export const editRpp = (id, payload) => {
  return client(`rpp/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteRpp = (id) => {
  return client(`rpp/${id}`, {
    method: "DELETE",
  });
};
