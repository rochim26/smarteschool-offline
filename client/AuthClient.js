import client from "./ApiClient";

export const loginPPDB = (payload) => {
  return client("ppdb/login", {
    method: "POST",
    body: payload,
  });
};

export const daftarPPDB = (payload) => {
  return client("ppdb/daftar", {
    method: "POST",
    body: payload,
  });
};

export const getProfilUser = () => {
  return client("profil-user");
};

export const postProfilUser = (payload) => {
  return client("profil-user", {
    method: "POST",
    body: payload,
  });
};
