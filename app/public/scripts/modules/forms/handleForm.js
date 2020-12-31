import { makeRequest } from '../fetch/makeRequest.js';

export default function handleForm(_btns) {

  const handleClick = (_btn) => {

    // get form attributes
    const form = _btn.form;
    const contentType = form.getAttribute('enctype');
    const method = form.getAttribute('method');
    const url = form.getAttribute('action');
    const responseRedirect = form.getAttribute('target');
    console.log(url);

    const currentHeaders = new Headers();

    currentHeaders.append('Content-Type', contentType);
    currentHeaders.append('Accept', contentType);

    const body = {};

    let formElements = Array.from(form.elements);

    formElements = formElements.filter(el => {
      if(el.hasAttribute('name')) {
        return el
      }
    });

    formElements.forEach(el => {
      const prop = el.getAttribute('name');
      const value = form[prop].value;
      body[prop] = value;
    });

    const stringified = JSON.stringify(body);

    console.log(stringified);


    // fetch data
    fetch(url, {
      method: 'POST',
      headers: currentHeaders,
      body: JSON.stringify(body)
     
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  _btns.forEach(_btn => {

    _btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleClick(e.target);      
    });

  });

}