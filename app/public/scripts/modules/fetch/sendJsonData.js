export async function sendJsonData(_url, _method, _data) {

  console.log('post data');

  const response = await fetch(_url, {
    method: _method,
    body: JSON.stringify(_data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return response.json();

}