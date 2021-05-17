const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const get = route => fetch(route, { headers }).then(res => res.json());

const post = (route, params) =>
  fetch(route, {
    headers,
    method: 'POST',
    body: JSON.stringify(params),
  });

const update = null;

export { get, post, update };
