export function addProject(form) {

  const message = form.querySelector('[data-message="form_message"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset form
    message.style.display = null;

    // get values
    const newProject = {
      title: form.title.value,
      code: form.code.value,
      desc: form.desc.value,
      edition: form.edition.value,
      client: form.client.value
    };

    try {

      const res = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      });

      const data = await res.json();
      const { success, errors } = data;

      if(!success) {
        message.classList.remove('alert-success');
        message.classList.add('alert-danger');
        message.textContent = errors.msg || '';
        
      }

      if(success) {
        location.assign('/projects');
      }

    } catch(err) {

      console.error(err);

    }
    
  });

}