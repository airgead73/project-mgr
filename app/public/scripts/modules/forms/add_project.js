import { sendFormData } from '../fetch/sendFormData.js';

export function addProject(form) {

  const message = form.querySelector('[data-message="form_message"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset form
    message.style.display = null;

    // get values
    // const newProject = {
    //   title: form.title.value,
    //   code: form.code.value,
    //   desc: form.desc.value,
    //   edition: form.edition.value,
    //   client: form.client.value
    // };
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