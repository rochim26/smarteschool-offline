import axios from "axios";

async function config(endpoint, { body, method, params }) {
  const headers = {
    "content-type": "application/json",
    accept: "application/json",
  };

  const config = {
    url: `/api/${endpoint}`,
    headers: {
      ...headers,
    },
    method: method || "GET",
  };

  if (params) {
    config.params = params;
  }

  if (body) {
    config.data = body;
  }

  const onSuccess = (res) => {
    let data = res?.data || null;

    return {
      isSuccess: true,
      error: false,
      data,
      status: res?.status,
    };
  };

  const onError = (err) => {
    let error = err?.response?.data;

    return {
      isSuccess: false,
      data: err?.data,
      error,
      status: err?.response?.status,
    };
  };

  return axios(config).then(onSuccess).catch(onError);
}

export const postFaceAbsen = (payload) => {
  const sendAbsenMuka = config("absen-muka", {
    method: "POST",
    body: payload,
  });
  return sendAbsenMuka;
};
