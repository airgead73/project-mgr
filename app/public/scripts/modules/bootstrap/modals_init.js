export function initDelete(_modals) {

  _modals.forEach((_modal) => {

    _modal.addEventListener('show.bs.modal', function(event) {

      const button = event.relatedTarget;
      const id = button.getAttribute('data-bs-id');
      const title = button.getAttribute('data-bs-title');

      const modalBody = _modal.querySelector('.modal-body');

      modalTitle.textContent = title;
      modalBody.textContent = `Do you want to delete ${title}?`;
      

    });

  });

}