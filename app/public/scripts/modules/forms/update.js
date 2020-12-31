export function update(form) {

  const message = form.querySelector('[data-message="form_message"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset form
    message.style.display = null;

    // identify project
    const project = form.getAttribute('data-project')

    // get values
    const updatedProject = {
      title: form.title.value,
      code: form.code.value,
      desc: form.desc.value,
      edition: form.edition.value,
      client: form.client.value      
    };  

    try {

      const res = await fetch(`/api/projects/${project}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProject),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      });

      const data = await res.json();
      const { success, errors } = data;
      

      if(!success) {
        console.log('no success');
        message.classList.remove('alert-success');
        message.classList.add('alert-danger');
        message.textContent = errors.msg || '';        
      }

      if(success) {
        location.assign(`/projects/${project}`);
      }

    } catch(err) {

      console.error(err);

    }

    
  });

}