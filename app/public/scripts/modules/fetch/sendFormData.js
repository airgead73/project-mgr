export async function sendFormData(_url, _method, _data) {

  console.log('post data');

  const response = await fetch(_url, {
    method: _method,
    body: _data,
    headers: {
      'Accept': 'application/json'
    }
  });

  return response.json();

}