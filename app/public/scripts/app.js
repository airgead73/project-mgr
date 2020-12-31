import handleForm  from './modules/forms/handleForm.js';

const submitBtns = Array.from(document.querySelectorAll('button[type="submit"]'));

if(submitBtns.length) { 
  
  handleForm(submitBtns);

}


















