const d = document;

// authentication
const formLogin = d.getElementById('form_login');
import {login} from "./modules/forms/login.js";


const formSignup = d.getElementById('signup');
if(formLogin) login(formLogin);


// handle forms
import { handleForm } from "./modules/forms/handle_form.js";
const submitBtns = Array.from(d.querySelectorAll('button[type="submit"]'));
if(submitBtns.length) handleForm(submitBtns);












