import client from "./ApiClient";

export const getJamMengajar = (params) => {
  return client("jam-mengajar", { params });
};

export const postJamMengajar = (body) => {
  return client("jam-mengajar", {
    body,
    method: "POST",
  });
};

export const editJamMengajar = (id, body) => {
  return client(`jam-mengajar/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteJamMengajar = (id) => {
  return client(`jam-mengajar/${id}`, {
    method: "DELETE",
  });
};
