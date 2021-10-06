import client from "./ApiClient";

export const getMajors = (params) => {
  return client("jurusan", { params });
};

export const postMajors = (body) => {
  return client("jurusan", {
    body,
    method: "POST",
  });
};

export const editMajor = (body, id) => {
  return client(`jurusan/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteMajor = (id) => {
  return client(`jurusan/${id}`, {
    method: "DELETE",
  });
};
