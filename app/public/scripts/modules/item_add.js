export function itemAdd(form) {

  const message = form.querySelector('[data-message="form_message"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log('item add');

    // reset form
    message.style.display = null;

    // get values
    const title = form.title.value;
    const project = form.getAttribute('data-project');
    const desc = form.desc.value;

    try {

      const res = await fetch(`/api/projects/${project}/items`, {
        method: 'POST',
        body: JSON.stringify({ title, project, desc }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      });

      const data = await res.json();
      const { success, errors } = data;

      console.log(data);

      if(!success) {
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