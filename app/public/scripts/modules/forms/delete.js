export function contentDelete(_btnsArray) {

  const btns = Array.from(_btnsArray);

  const deleteItem = async (_type, _id) => {

    try {

      const res = await fetch(`/api/${_type}/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await res.json();
      const { success, errors } = data;

      console.log('success:', success);

    } catch(err) {

      console.log(err)

    }



  }

  const configureBtn = (_btn) => {

    _btn.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = e.target;
      const contentType = btn.getAttribute('data-delete');
      const contentID = btn.getAttribute('data-target');  
      
      deleteItem(contentType, contentID);

    });

  }  

  btns.forEach(btn => {
    configureBtn(btn);
  });



}