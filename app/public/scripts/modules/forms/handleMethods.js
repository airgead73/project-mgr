const handleGet = function() {
  console.log(('GET request'));
}

const handlePost = async function(_form) {
  const contentType = _form.getAttribute('enctype');
  const url = _form.getAttribute('action');

  // set request headers
  const currentHeaders = new Headers();

  if(contentType === 'application/json') {
    currentHeaders.append('Content-Type', contentType);
  }
    
  currentHeaders.append('Accept', contentType);

  // set request body

  let body;

  if(contentType === 'application/json') {
    let formElements = Array.from(_form.elements);

    formElements = formElements.filter(el => {
      if(el.hasAttribute('name')) {
        return el
      }
    });

    body = {};
  
    formElements.forEach(el => {
      const prop = el.getAttribute('name');
      const value = _form[prop].value;
      body[prop] = value;
    });
  
  body = JSON.stringify(body);     
   } else if(contentType === 'multipart/form-data') {
      body = new FormData(_form);
  }  

  // fetch

  let response = await fetch(url, {
    method: 'POST',
    headers: currentHeaders,
    body: body   
  });

  let data = await response.json();

  return data;



}

const handlePut = function(_form) {
  console.log('PUT request');
}

const handleDelete = async function(_form) {
  const contentType = _form.getAttribute('enctype');
  const url = _form.getAttribute('action');

  // set request headers
  const currentHeaders = new Headers();

  if(contentType === 'application/json') {
    currentHeaders.append('Content-Type', contentType);
  }
    
  currentHeaders.append('Accept', contentType);console.log('DELETE request');

  // fetch

  let response = await fetch(url, {
    method: 'DELETE',
    headers: currentHeaders
  });
  
  let data = await response.json();
  
  return data;

}

export { handleGet, handlePost, handlePut, handleDelete };