import client from "./ApiClient";

export const getTamu = (params) => {
  return client("tamu", {
    params,
  });
};
