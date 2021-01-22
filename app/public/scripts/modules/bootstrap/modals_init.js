export function initDelete(_modals) {

  console.log(_modals);

  _modals.forEach((_modal) => {

    _modal.addEventListener('show.bs.modal', function(event) {

      const button = event.relatedTarget;
      const action = button.getAttribute('data-bs-action');
      const title = button.getAttribute('data-bs-title');
      const type = button.getAttribute('data-bs-type');
      const deleteType = _modal.querySelector('.delete-type');
      const modalBody = _modal.querySelector('.modal-body');
      const form = _modal.querySelector('form');

      form.setAttribute('action', action);
      deleteType.textContent = type;
      modalBody.textContent = `Do you want to delete ${title}?`;      

    });

  });

}