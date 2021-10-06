import { momentPackage } from "../utilities/HelperUtils";
import client from "./ApiClient";

export const getRombel = (params) => {
  return client(`rombel`, { params });
};

export const getDetailRombel = (id, params) => {
  return client(`rombel/${id}`, { params });
};

export const postRombel = (body) => {
  return client("rombel", {
    method: "POST",
    body,
  });
};

export const downloadRombel = (body) => {
  return client("rombel/download-rombel", {
    method: "POST",
    body,
  });
};

export const deleteRombel = (id) => {
  return client(`rombel/${id}`, {
    method: "DELETE",
  });
};

export const putRombel = (id, body) => {
  return client(`rombel/${id}`, {
    method: "PUT",
    body,
  });
};

export const downloadAnalisis = (id) => {
  return client(`rombel-download/${id}/download-analisis-nilai`, {
    method: "POST",
  });
}