import { displayFormMessage } from './handle_messages.js';

export function login(form) {

  const messageContainer = form.querySelector('[data-message="form_message"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset form
    messageContainer.style.display = null;

    // get values
    const email = form.email.value;
    const password = form.password.value;

    try {

      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      });

      const data = await res.json();
      const { success, messages } = data;

      console.log(data);

      // if(!success) {
      //   console.log(data)
      //   displayFormMessage(messageContainer, messages, success);
      // }

      if(success) {
        console.log('success')
        form.reset();
        location.assign('/')
      }

    } catch(err) {

      console.error(err);

    }

    
  });

}