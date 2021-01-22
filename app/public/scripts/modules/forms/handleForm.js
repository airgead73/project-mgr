import { showSuccess, showFailure } from '../messages/show.js';
import { handleGet, handlePost, handlePut, handleDelete } from './handleMethods.js';
export default function handleForm(_btns) {

  const handleResponse = (_form, _data) => {
    const { success, msg } = _data;
    const method = _form.getAttribute('method');

    switch(method) {
      case 'GET':
        console.log('GET request');
        break;
      case 'POST':
        const messageContainer = _form.querySelector('[data-message="container"]') 
        if(success) {
       
          _form.reset();
          console.log(_data);
          showSuccess(messageContainer, msg);
    
          } else {
    
          console.error(_data.messages);
          showFailure(messageContainer, _data.messages);
    
          }
        break;
      case 'PUT':
        console.log('PUT request');
        const relocateTo = _form.getAttribute('target');
        if(success) {
          window.location.replace(relocateTo);
        } else {
          console.error(_data.messages);
        }
        break;
      case 'DELETE':
        if(success) {
          window.location.reload();
        } else {
          console.error(_data.messages);
        }
        break;
      default:
        if(success) {
       
          _form.reset();
          console.log(_data);
          showSuccess(messageContainer, msg);
    
          } else {
    
          console.error(_data.messages);
          showFailure(messageContainer, _data.messages);
    
          }
        break;
    }
 
  }

  const assignMethodHandler = (_form) => {

    const method = _form.getAttribute('method') || null;

    switch(method) {
      case 'GET':
        handleGet(_form);
        break;
      case 'POST':
        handlePost(_form).then(data => handleResponse(_form, data));
        break; 
      case 'PUT':
        handlePut(_form).then(data => handleResponse(_form, data));
        break;
      case 'DELETE':
        handleDelete(_form).then(data => handleResponse(_form, data));
        break;
      default:
        console.error('No method available.');
        break;                               

    }

  }

  _btns.forEach(_btn => {    

    _btn.addEventListener('click', (e) => {

      e.preventDefault();
      const form = (e.target).form;
      assignMethodHandler(form);
           
    });

  }); 

}