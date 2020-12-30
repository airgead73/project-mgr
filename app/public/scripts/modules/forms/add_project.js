import { sendFormData } from '../fetch/sendFormData.js';

export function addProject(form) {

  const message = form.querySelector('[data-message="form_message"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset form
    message.style.display = null;

    const newProject = new FormData(e.target);

    console.log(newProject);

    sendFormData('/api/projects', 'POST', newProject)
      .then(data => {
        console.log(data);
        const { success, errors } = data;

        if(success) {
          console.log('success');
          form.reset();          
        } else {
          console.log(errors);
        }
      });
    
  });

}