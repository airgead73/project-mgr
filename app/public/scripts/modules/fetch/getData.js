export async function getData(_url) {

  const response = await fetch(_url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return response.json();

}