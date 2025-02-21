const host = "https://localhost:3030";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data !== undefined) {
    options.headers["Content-Type"] = "application.json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(host + url, options);

    if (response.ok == 204) {
      return response;
    }

    const data = await response.json();

    if (response.ok == false) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export const get = request.bind(null, "get");
export const post = request.bind(null, "post");
export const put = request.bind(null, "put");
export const del = request.bind(null, "delete");
