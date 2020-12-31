export async function login(_url, _data) {

 const response = await fetch(_url, {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return response.json();

}