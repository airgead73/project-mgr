import {login} from "./modules/login.js";
import {signup} from "./modules/signup.js";
import {projectAdd} from "./modules/project_add.js";
import {itemAdd} from "./modules/item_add.js";
import {projectUpdate} from "./modules/project_update.js";
import {contentDelete} from "./modules/delete.js";

const d = document;
const formLogin = d.getElementById('form_login');
const formSignup = d.getElementById('signup');
const formProjectAdd = d.getElementById('form_project_add');
const formProjectUpdate = d.getElementById('form_project_update');
const formItemAdd = d.getElementById('form_item_add');
const btnsDelete = d.querySelectorAll('[data-delete]');

if(formLogin) login(formLogin);
if(formSignup) signup(formSignup);
if(formProjectAdd) projectAdd(formProjectAdd);
if(formProjectUpdate) projectUpdate(formProjectUpdate);
if(formItemAdd) itemAdd(formItemAdd);
if(btnsDelete) contentDelete(btnsDelete);








