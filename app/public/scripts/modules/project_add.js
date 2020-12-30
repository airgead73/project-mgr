export function projectAdd(form) {

  const message = form.querySelector('[data-message="form_message"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset form
    message.style.display = null;

    // get values
    const title = form.title.value;
    const code = form.code.value;
    const desc = form.desc.value;

    try {

      const res = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({ title, code, desc }),
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