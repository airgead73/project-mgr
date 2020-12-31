import '../../bootstrap.min.js'

export function showSuccess(_container, _message) {


  const textContainer = _container.querySelector('[data-message="text"]');
  textContainer.textContent = _message;

  const bsAlert = new bootstrap.Alert(_container);

  _container.classList.remove('alert-warning');
  _container.classList.add('alert-success');
  _container.style.display = "block";

}