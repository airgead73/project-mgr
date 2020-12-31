import { makeRequest } from '../fetch/makeRequest.js';

export default function handleForm(_submitBtns) {

  const handleSubmit = async (_btn) => {

    console.log('handle submit', _btn);

    const currentForm = document.getElementById(_btn.getAttribute('form'));
    const currentHeaders = new Headers();
    const contentType = _btn.getAttribute('formenctype');
    const url = _btn.getAttribute('formaction');
    const method = _btn.getAttribute('formmethod');
    const target = _btn.getAttribute('formtarget');
    let data = null;

    currentHeaders.append('Accept', 'application/json');

    if(contentType === 'application/json') {
      currentHeaders.append('Content-Type', contentType);
    }

    if(method === 'POST' || method === 'PUT') {
      data = new FormData(currentForm);
    }



    const currentRequest = new Request(url, {
      method: method,
      headers: currentHeaders,
      body: data


    });



  }

  _submitBtns.forEach(_btn => {

    _btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleSubmit(e.target);
    });

  });


  console.log('Handle Form');
  makeRequest();

}