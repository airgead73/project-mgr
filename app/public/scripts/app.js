import handleForm  from './modules/forms/handleForm.js';
import { initDelete } from './modules/bootstrap/modals_init.js';

const submitBtns = Array.from(document.querySelectorAll('button[type="submit"]'));
const deleteModals = Array.from(document.querySelectorAll('.modal--delete'));
if(submitBtns.length) handleForm(submitBtns);
if(deleteModals.length) initDelete(deleteModals);


















