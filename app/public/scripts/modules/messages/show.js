import '../../bootstrap.min.js'

export function showSuccess(_container, _message) {

  const textContainer = _container.querySelector('[data-message="text"]');
  textContainer.textContent = _message;

  const bsAlert = new bootstrap.Alert(_container);

  _container.classList.remove('alert-warning');
  _container.classList.add('alert-success');
  _container.style.display = "block";

}

export function showFailure(_container, _messages) {

  const textContainer = _container.querySelector('[data-message="text"]');
  let messageStr = '';

  _messages.forEach(_msg => {
    const messageArray = Object.values(_msg);
    messageStr = messageStr + ` ${messageArray[0]}`
  });

  textContainer.textContent = messageStr;

  const bsAlert = new bootstrap.Alert(_container);

  _container.classList.remove('alert-success');
  _container.classList.add('alert-warning');
  _container.style.display = "block";

}