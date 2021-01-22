import { showSuccess, showFailure } from '../messages/show.js';
import { handleGet, handlePost, handlePut, handleDelete} from './handleMethods.js';
export default function handleForm(_btns) {

  const handleResponse = (_form, _data) => {
    const { success, msg } = _data;
    const method = _form.getAttribute('method');

    if(method === 'DELETE' && success) {

      return window.location.reload();

    }

    const messageContainer = _form.querySelector('[data-message="container"]') 
    if(success) {
   
      _form.reset();
      console.log(_data);
      showSuccess(messageContainer, msg);

      } else {

      console.log(_data.messages);
      showFailure(messageContainer, _data.messages);

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
        handlePut(_form);
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