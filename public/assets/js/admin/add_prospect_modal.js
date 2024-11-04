var add_prospect_modal_toggler = document.querySelector(".add_prospect_button--g");
var submit_prospect_button =  document.querySelector(".add_prospect_button");

var prospect_add_form = document.querySelector("#prospect_form");

var isAddProspectModalOpen = false;

add_prospect_modal_toggler.addEventListener("click",(e)=>{
  ToggleModalAddProspect(true);
});

function ToggleModalAddProspect(isOn){

  var prospect_modal_add = document.querySelector(".prospect_modal--add");

  isAddProspectModalOpen = isOn;
  console.log(isAddProspectModalOpen);
  window.location.href = "#prospect_title"
  if(!isAddProspectModalOpen){
    prospect_modal_add.classList.add("prospect_modal--inactive")
  }
  else{
    prospect_modal_add.classList.remove("prospect_modal--inactive")
  }

}

async function SubmitProspect(){

  var form = document.querySelector("#prospect_form");

  ToggleModalAddProspect(false);

  const formData = new FormData(form);
  var data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }

  if(!data.name){
    alert("Requires a Name");
    return;
  }

  var response = await axios.post("/admin/prospect/add/",data);

  if(response){
    alert("Success");
  }
  else{
    alert("Invalid Input");
  }

}

submit_prospect_button.addEventListener("click",(e)=>{
  e.preventDefault();
  SubmitProspect();
})

prospect_add_form.addEventListener("submit",(e)=>{
  e.preventDefault();
  SubmitProspect();
})
