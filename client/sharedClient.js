import client from "./ApiClient";

export const getPreview = (body) => {
  return client("single-upload", {
    method: "POST",
    body,
  });
};

export const getProfil = () => {
  return client("profil");
};

export const editProfil = (body) => {
  return client("profil", {
    method: "PUT",
    body,
  });
};

export const changePassword = (body) => {
  return client("ubah-password", {
    method: "PUT",
    body,
  });
};
