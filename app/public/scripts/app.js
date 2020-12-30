const d = document;

// authentication
const formLogin = d.getElementById('form_login');
import {login} from "./modules/forms/login.js";
import {signup} from "./modules/forms/signup.js";

const formSignup = d.getElementById('signup');
if(formLogin) login(formLogin);
if(formSignup) signup(formSignup);

// add Project
import {addProject} from "./modules/forms/add_project.js";
const formAddProject = d.getElementById('form_add_project');
if(formAddProject) addProject(formAddProject);

// update Project
import {updateProject} from "./modules/forms/update_project.js";
const formUpdateProject = d.getElementById('form_update_project');
if(formUpdateProject) updateProject(formUpdateProject);

// add Item
import {addItem} from "./modules/forms/add_item.js";
const formAddItem = d.getElementById('form_add_item');
if(formAddItem) addItem(formAddItem);

// delete content
import {contentDelete} from "./modules/forms/delete.js";
const btnsDelete = d.querySelectorAll('[data-delete]');
if(btnsDelete) contentDelete(btnsDelete);








