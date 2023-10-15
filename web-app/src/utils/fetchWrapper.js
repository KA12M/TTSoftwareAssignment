const baseUrl = import.meta.env.VITE_API_URL;

const get = async (url) => {
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
};

const post = async (url, body = {}) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
    headers: getHeaders(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
};

const put = async (url, body = {}) => {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: getHeaders(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
};

const patch = async (url, body = {}) => {
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: getHeaders(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
};

const del = async (url, body = {}) => {
  const requestOptions = {
    method: "DELETE",
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
};

const handleResponse = async (response) => {
  const text = await response.text();
  // const data = text && JSON.parse(text);
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    data = text;
  }

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      statusCode: typeof data === "string" ? data : response.statusText,
    };
    return { error };
  }
};

function getHeaders() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return headers;
}

export const fetchWrapper = {
  get,
  post,
  put,
  patch,
  del,
};
