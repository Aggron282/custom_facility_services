var add_labor_modal_toggler = document.querySelector(".add_labor_button--g");
var submit_labor_button =  document.querySelector(".add_labor_button");
var exit_add_labor_modal = document.querySelector("#exitaddlabor")
var labor_add_form = document.querySelector("#labor_form");

var labor_class = "labor_modal--";

var inactive_class_labor = labor_class+"inactive";
var active_class_labor = labor_class+"active";
var isAddLaborModalOpen = false;

add_labor_modal_toggler.addEventListener("click",(e)=>{
  ToggleModalAddLabor(true);
});

exit_add_labor_modal.addEventListener("click",(e)=>{
  ToggleModalAddLabor(false);
});



const ToggleModalAddLabor = (isOn) => {

  var modal_add = document.querySelector(".labor_modal--add");
  console.log(modal_add);
  isAddLaborModalOpen = isOn;

  ToggleActiveClasses(modal_add,inactive_class_labor,active_class_labor,isAddLaborModalOpen);

}


const SubmitLaborer = async () => {

  var form = document.querySelector("#laborer_form");

  ToggleModalAddLabor(false);

  var data = CreateFormData(form);

  if(!data.name){
    CreatePopup(`You are Missing Important Data`);
    return;
  }
  console.log(data);
  var response = await axios.post("/admin/laborer/add/",data);

  if(response){
    CreatePopup(`Added Laborer!`);
    await DelayedRefresh(1000)
  }
  else{
    CreatePopup(`Invalid Input`);
  }

}

submit_labor_button.addEventListener("click",(e)=>{
  e.preventDefault();
  SubmitLaborer();
})

labor_add_form.addEventListener("submit",(e)=>{
  e.preventDefault();
  SubmitLaborer();
})
