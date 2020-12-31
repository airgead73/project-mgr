import { sendFormData } from '../fetch/sendFormData.js';
import { login } from '../fetch/login.js';

export function handleForm(_formBtns) {

  const d = document;
  let success, errors, data;

  const handleSubmit = function(_btn) {

  // attributes from button
  const attrs = {
    id: _btn.getAttribute('form'),
    url: _btn.getAttribute('formaction'),
    method: _btn.getAttribute('formmethod'),
    redirect: _btn.getAttribute('formtarget'),
  }

  //get form
  const form = d.getElementById(attrs.id);

  if(attrs.id.includes('login')) {

    // get values
    const email = form.email.value;
    const password = form.password.value;

    login(attrs.url, { email, password})
      .then(_data => {
        data = _data;
      });

  } else {

    const dataToSend = new FormData(form);

    sendFormData(attrs.url, attrs.method, dataToSend)
      .then(_data => {
        data = _data;
      }); 

    }

    console.log(data);

  }

  _formBtns.forEach(_btn => {

    _btn.addEventListener('click', (e) => {

      e.preventDefault();
      handleSubmit(e.target);

    });

  });

}