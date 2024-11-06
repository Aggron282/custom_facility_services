var quote_display_container = document.getElementsByClassName("quote_display_container");

for(var i =0; i < quote_display_container.length;i++){

    var choice_container_detail = quote_display_container[i].querySelector(".choice_container--details");
    var choice_container_delete = quote_display_container[i].querySelector(".choice_container--delete");
    var choice_container_status = quote_display_container[i].querySelector(".choice_container--status");
    var choice_container_completed = quote_display_container[i].querySelector(".choice_container--completed");
    if(!choice_container_completed || choice_container_status || choice_container_delete || choice_container_detail){
      break;
    }
    choice_container_delete.addEventListener("click",(e)=>{
      var parent_ = e.target.parentElement.parentElement.parentElement;
      var _id = parent_.getAttribute("quote_id");
      DeleteProspect(_id);
    });

    choice_container_detail.addEventListener("click",(e)=>{
      var parent_ = e.target.parentElement.parentElement.parentElement;
      DetailFeature(parent_);
    });

    choice_container_status.addEventListener("click",(e)=>{
      var parent_ = e.target.parentElement.parentElement.parentElement;
      StatusFeature(parent_);
    });

    choice_container_completed.addEventListener("click",(e)=>{
      var parent_ = e.target.parentElement.parentElement.parentElement;
      CompletedFeature(parent_);
    });

}

async function SubmitDetails(modal,form){

  var banner = document.querySelector(".updated_banner");

  banner.classList.add("updated_banner--updated")

  const formData = new FormData(form);
  
  var data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }
  
  data._id = modal.parentElement.getAttribute("quote_id");

  await axios.post("/admin/prospect/details/",data);

  setTimeout(()=>{
    banner.classList.remove("updated_banner--updated")
  },3000);
  CollapseAllModals();

}

function ToggleModal(modal,index){

  modal.setAttribute("active",index);

  if(index >= 1 ){
    modal.classList.remove("quote_modal--inactive");
    modal.classList.add("quote_modal--active");
  }
  else{
    modal.classList.add("quote_modal--inactive");
    modal.classList.remove("quote_modal--active");
  }

}

async function DeleteProspect(_id){
  await axios.post("/admin/prospect/delete",{_id:_id});
  alert("Deleted Prospect");
  window.location.assign(window.location.href);
}

async function StatusFeature(parent_){
  
  CollapseAllModals();
  
  var modal = parent_.querySelector(".quote_status_modal");
  var active_index = modal.getAttribute("active");
  var button = modal.querySelector(".form_status_button");
  var form = modal.querySelector(".quote_status_form");
  var select = modal.querySelector("#status");
  var current_status_element = modal.querySelector('#status_text--choose');
  var quote_status = parent_.querySelector("#currentstatus");
  
  current_status_element.className = quote_status.className;
  current_status_element.innerText = quote_status.innerText;

  active_index = parseInt(active_index);

  if(active_index == 0){
    ToggleModal(modal,1);
  }

  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    SubmitStatus(modal,form);
  });

  select.addEventListener("change",(e)=>{
    ChangeCurrentStatusModalText(current_status_element,select.value)
  })

  button.addEventListener("click",(e)=>{
    e.preventDefault();
    SubmitStatus(modal,form);
  });

}

async function CompletedFeature(parent_){
  
  CollapseAllModals();
  
  var modal = parent_.querySelector(".quote_completed_modal");
  var active_index = modal.getAttribute("active");
  var button = modal.querySelector(".form_completed_button");
  var form = modal.querySelector(".quote_completed_form");
  
  active_index = parseInt(active_index);

  if(active_index == 0){
    ToggleModal(modal,1);
  }

  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    SubmitCompleted(modal,form);
  });

  button.addEventListener("click",(e)=>{
    e.preventDefault();
    SubmitCompleted(modal,form);
  });

}

async function SubmitCompleted(modal,form){
  var banner = document.querySelector(".updated_banner");
  
  banner.classList.add("updated_banner--updated")

  const formData = new FormData(form);
  
  var data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }
  
  data._id = modal.parentElement.getAttribute("quote_id");
  data.quote = modal.parentElement.getAttribute("quote");

  await axios.post("/admin/prospect/completed/",data);

  setTimeout(()=>{
    banner.classList.remove("updated_banner--updated")
  },3000);

  CollapseAllModals();

}

async function SubmitStatus(modal,form){

  var banner = document.querySelector(".updated_banner");

  banner.classList.add("updated_banner--updated")

  const formData = new FormData(form);
  
  var data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }
  
  data._id = modal.parentElement.getAttribute("quote_id");
  console.log(data)
  await axios.post("/admin/prospect/status/",data);

  setTimeout(()=>{
    banner.classList.remove("updated_banner--updated")
  },3000);
  CollapseAllModals();
}

function ChangeCurrentStatusModalText(element,status){
   
    var status_config = {name:"Subscribed",style:"subscribed--status"}
  
    status = parseInt(status);
   
    console.log(status)
   
    if(status == 0){
      status_config.name = "Subscribed" 
      status_config.style = "subscribed--subscribed" 
    }
    else if (status == 1 ){
      status_config.name = "In Contact" 
      status_config.style = "subscribed--contact" 
    }
    else if(status == 2){
      status_config.name = "Quoted" 
      status_config.style = "subscribed--quoted"  
    }
    else if(status == 3){
      status_config.name = "Scheduled"
      status_config.style = "subscribed--schedule"
    }
    else if(status == 4){
      status_config.name = "Completed"
      status_config.style = "subscribed--completed"
    }
    else if(status == 5){
      status_config.name = "Loyal Customer"
      status_config.style = "subscribed--loyal"
    }

  element.className = status_config.style;
  element.innerText = status_config.name;
  
  console.log(status_config)
  

}

async function CollapseAllModals(){
 
  var all_modals = document.querySelectorAll(".quote_modal");
 
  for(var i = 0; i < all_modals.length; i++){
    all_modals[i].classList.add("quote_modal--inactive");
    all_modals[i].classList.remove("quote_modal--active");
    all_modals[i].setAttribute("active",0);
  }

}

async function DetailFeature(parent_){
 
  CollapseAllModals();
 
  var modal = parent_.querySelector(".quote_detail_modal");
  var active_index = modal.getAttribute("active");
  var button = modal.querySelector(".form_detail_button");
  var form = modal.querySelector(".quote_detail_form");

  active_index = parseInt(active_index);

  if(active_index == 0){
    ToggleModal(modal,1);
  }

  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    SubmitDetails(modal,form);
  });

  button.addEventListener("click",(e)=>{
    e.preventDefault();
    SubmitDetails(modal,form);
  });

}