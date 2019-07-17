export const fetchy = async (path, data) => {
  let options = {
    method: "GET"
  };
  if (data) {
    options.method = "POST";
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=utf-8"
    };
  }
  const response = await fetch(path, options);
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};
