import { showSuccess } from '../messages/show.js';

export default function handleForm(_btns) {

  const handleClick = (_btn) => {

    // get form attributes
    const form = _btn.form;
    const contentType = form.getAttribute('enctype');
    const method = form.getAttribute('method');
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
    }  

    // fetch data
    fetch(url, {
      method: method,
      headers: currentHeaders,
      //body: JSON.stringify(body)
      body: body
     
    })
      .then(response => response.json())
      .then(data => {
        const { success, msg, errors } = data;
        if(success) {

          if(method === 'PUT') {
            location.assign(responseRedirect);
          } else if(method === 'POST') {
            form.reset();
            showSuccess(messageContainer, msg);
          }

        } else {

          console.log(errors);

        }
        
      });
  }

  _btns.forEach(_btn => {

    _btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleClick(e.target);      
    });

  });

}