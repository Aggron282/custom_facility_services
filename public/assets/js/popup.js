const CreatePopup = (message) => {

  var element = document.createElement("div");

  element.classList.add("popup");
  element.innerHTML = message;

  document.body.appendChild(element);

  setTimeout(()=>{
    element.classList.add("popup_back");
  },3000)

}
