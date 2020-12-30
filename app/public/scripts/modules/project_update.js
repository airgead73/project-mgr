export function projectUpdate(form) {

  const message = form.querySelector('[data-message="form_message"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset form
    message.style.display = null;

    // get values
    const title = form.title.value;
    const code = form.code.value;
    const desc = form.desc.value;
    const project = form.getAttribute('data-project'); 

    try {

      const res = await fetch(`/api/projects/${project}`, {
        method: 'PUT',
        body: JSON.stringify({ title, code, desc }),
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