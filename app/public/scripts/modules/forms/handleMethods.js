export function handleGet() {
  console.log('GET request');
}

export function handlePost(_btn) {
  const form = _btn.form;
  const contentType = form.getAttribute('enctype');
  const url = form.getAttribute('action');
  const responseRedirect = form.getAttribute('target');
  const messageContainer = form.querySelector('[data-message="container"]'); 

  // set request headers
  const currentHeaders = new Headers();

  if(contentType === 'application/json') {
    currentHeaders.append('Content-Type', contentType);
  }
    
  currentHeaders.append('Accept', contentType);

  // set request body

  let body;

  if(contentType === 'application/json') {
    let formElements = Array.from(form.elements);

    formElements = formElements.filter(el => {
      if(el.hasAttribute('name')) {
        return el
      }
    });

    body = {};
  
    formElements.forEach(el => {
      const prop = el.getAttribute('name');
      const value = form[prop].value;
      body[prop] = value;
    });
  
  body = JSON.stringify(body);     
   } else if(contentType === 'multipart/form-data') {
      body = new FormData(form);
  }  

  // fetch data
  fetch(url, {
    method: method,
    headers: currentHeaders,
    body: body     
  })
    .then(response => response.json())
    .then(data => {
      const { success, msg } = data;
      if(success) {

        if(method === 'PUT') {
          location.assign(responseRedirect);
        } else if(method === 'POST') {
          form.reset();
          console.log(data);
          //showSuccess(messageContainer, msg);
        }

      } else {

        console.log(data.messages);
        //showFailure(messageContainer, data.messages);

      }
        
    });  



}

export function handlePut() {
  console.log('PUT request');
}

export function handleDelete() {
  console.log('DELETE request');
}