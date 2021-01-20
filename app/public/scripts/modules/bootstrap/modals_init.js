export function initDelete(_modals) {

  _modals.forEach((_modal) => {

    _modal.addEventListener('show.bs.modal', function(event) {

      const button = event.relatedTarget;
      const action = button.getAttribute('data-bs-action');
      const title = button.getAttribute('data-bs-title')
      const modalBody = _modal.querySelector('.modal-body');
      const form = _modal.querySelector('form');

      form.setAttribute('action', action);
      modalBody.textContent = `Do you want to delete ${title}?`;      

    });

  });

}