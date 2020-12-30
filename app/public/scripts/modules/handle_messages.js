const dangerClass = 'alert-danger';
const successClass = 'alert-succes';

export function displayFormMessage(
  _messageContainer, 
  _messagesArr, 
  _success = true
  ) {

    let alertClass = _success ? successClass : dangerClass;

    console.log("success:", _success);
    console.log("alert:", alertClass);
    console.log("messages", _messagesArr);


}