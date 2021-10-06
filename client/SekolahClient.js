import client from "./ApiClient";

export const getSekolah = () => {
  return client("sekolah");
};

export const getMasterSekolah = (params) => {
  return client("master/sekolah", { params });
};

export const meSekolah = () => {
  return client("sekolah/me");
};

export const postSekolah = (payload) => {
  return client("sekolah", {
    method: "POST",
    body: payload,
  });
};

export const editSekolah = (id, payload) => {
  return client(`sekolah/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteSekolah = (id) => {
  return client(`sekolah/${id}`, {
    method: "DELETE",
  });
};
