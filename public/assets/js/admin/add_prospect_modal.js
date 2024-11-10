var add_prospect_modal_toggler = document.querySelector(".add_prospect_button--g");
var submit_prospect_button =  document.querySelector(".add_prospect_button");
var prospect_add_form = document.querySelector("#prospect_form");

var prospect_class = "prospect_modal--";

var active = "active";
var inactive = "inactive";

var inactive_class_prospect = prospect_class+inactive;
var active_class_prospect = prospect_class+active;

var isAddProspectModalOpen = false;

add_prospect_modal_toggler.addEventListener("click",(e)=>{
  ToggleModalAddProspect(true);
});

const ToggleModalAddProspect = (isOn) => {

  var prospect_modal_add = document.querySelector(".prospect_modal--add");

  isAddProspectModalOpen = isOn;

  ToggleActiveClasses(prospect_modal_add,inactive_class_prospect,active_class_prospect,isAddProspectModalOpen);

}

const SubmitProspect = async () => {

  var form = document.querySelector("#prospect_form");

  ToggleModalAddProspect(false);

  var data = CreateFormData(form);

  if(!data.name){
    CreatePopup(`Requires a Name`);
    return;
  }

  var response = await axios.post("/admin/prospect/add/",data);

  if(response){
    CreatePopup(`Added Prospect!`);
    await DelayedRefresh(1000)
  }
  else{
    CreatePopup(`Invalid Input`);
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
