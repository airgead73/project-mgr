export function signup(form) {

  console.log(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit attempted');
  });

}








