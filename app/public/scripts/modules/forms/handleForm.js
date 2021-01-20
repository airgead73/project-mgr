//import { showSuccess, showFailure } from '../messages/show.js';
import { handleGet, handlePost, handlePut, handleDelete} from './handleMethods.js';
export default function handleForm(_btns) {

  const assignMethodHandler = (_target, _method) => {

    switch(_method) {
      case 'GET':
        handleGet(_target);
        break;
      case 'POST':
        handlePost(_target);
        break; 
      case 'PUT':
        handlePut(_target);
        break;
      case 'DELETE':
        handleDelete(_target);
        break;
      default:
        console.error('No method available.');
        break;                               

    }

  }

  _btns.forEach(_btn => {    

    _btn.addEventListener('click', (e) => {

      e.preventDefault();
      const target = e.target
      const method = target.getAttribute('formmethod') || null;
      assignMethodHandler(target, method);
           
    });

  });  

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



}