var quote_display_container = document.getElementsByClassName("quote_display_container");
var modal_class = "quote_modal--";

var active = "active";
var inactive = "inactive";

var modal_inactive_class = modal_class + inactive;
var modal_active_class = modal_class + active;

const InitProspectMenus = () => {

  for(var i =0; i < quote_display_container.length;i++){

    var choice_container_detail = quote_display_container[i].querySelector(".choice_container--details");
    var choice_container_delete = quote_display_container[i].querySelector(".choice_container--delete");
    var choice_container_status = quote_display_container[i].querySelector(".choice_container--status");
    var choice_container_completed = quote_display_container[i].querySelector(".choice_container--completed");

    if(!choice_container_completed || !choice_container_status || !choice_container_delete || !choice_container_detail){
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

}

const StatusFeature = async (parent_) => {

  CollapseAllModals();

  var modal = parent_.querySelector(".quote_status_modal");

  var {active_index,button,form} = ExtractElementFromModal(modal,"form_status_button","quote_status_form");

  var select = modal.querySelector("#status");
  var current_status_element = modal.querySelector('#status_text--choose');
  var quote_status = parent_.querySelector("#currentstatus");

  ChangeCurrentStatusModalText(current_status_element,0)

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

const CompletedFeature = async (parent_) => {

  CollapseAllModals();

  var modal = parent_.querySelector(".quote_completed_modal");
  var {active_index,button,form} = ExtractElementFromModal(modal,"form_completed_button","quote_completed_form");

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

const DetailFeature = async (parent_) => {

  CollapseAllModals();

  var modal = parent_.querySelector(".quote_detail_modal");

  var {active_index,button,form} = ExtractElementFromModal(modal,"form_detail_button","quote_detail_form");

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

const SubmitCompleted = async (modal,form) => {

  var data = CreateFormData(form);

  data._id = modal.parentElement.getAttribute("quote_id");
  data.quote = modal.parentElement.getAttribute("quote");

  const res = await axios.post("/admin/prospect/completed/",data);

  var feedback = await FeedbackToUser(res.data,"Great Job!","Error in Submitting Completion");

  if(feedback){
    await DelayedRefresh(1000)
  }

  CollapseAllModals();

}

const SubmitStatus = async (modal,form) => {

  var data = CreateFormData(form);

  data._id = modal.parentElement.getAttribute("quote_id");

  const res = await axios.post("/admin/prospect/status/",data);

  var feedback = await FeedbackToUser(res.data,"Changed Status!","Error in Changing Status");

  if(feedback){
    DelayedRefresh(1000)
  }

  CollapseAllModals();

}

const SubmitDetails = async (modal,form) => {

 var data = CreateFormData(form);

 data._id = modal.parentElement.getAttribute("quote_id");

 const res = axios.post("/admin/prospect/details/",data);

 var feedback = await FeedbackToUser(res.data,"Edited Prospect Details!","Error in Editing");

 if(feedback){
    await DelayedRefresh(1000);
 }

 CollapseAllModals();

}

const DeleteProspect = async (_id) => {

  const res =  axios.post("/admin/prospect/delete",{_id:_id});

  var feedback = await FeedbackToUser(res.data,"Deleted Prospect","Error in Deleting");

  if(feedback){
    await DelayedRefresh(1000)
  }

}

const FeedbackToUser = async (data,success_message,error_message) => {

  if(data){
    CreatePopup(success_message);
    return true;
  }else{
    CreatePopup(error_message);
    return false;
  }

}

const ExtractElementFromModal = (modal_element,button_class,form_class) => {

  var active_index = modal_element.getAttribute("active");

  var button = modal_element.querySelector("."+button_class);
  var form = modal_element.querySelector("."+form_class);

  active_index = isNaN(parseInt(active_index)) ? 0 : parseInt(active_index);

  return {
    form:form,
    button:button,
    active_index:active_index
  }

}

const ChangeCurrentStatusModalText = (element,status) => {

    var status_config = {name:"Subscribed",style:"subscribed--status"}

    status = parseInt(status);

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

}

const CollapseAllModals = async () => {

  var all_modals = document.querySelectorAll(".quote_modal");

  for(var i = 0; i < all_modals.length; i++){
    ToggleActiveClasses(all_modals[i],modal_inactive_class,modal_active_class,false);
    all_modals[i].setAttribute("active",0);
  }

}

const ToggleModal = (modal,index) => {

  modal.setAttribute("active",index);

  if(index == 1 ){
    ToggleActiveClasses(modal,modal_inactive_class,modal_active_class,true);
  }
  else{
    ToggleActiveClasses(modal,modal_inactive_class,modal_active_class,false);
  }

}

const GlobalSubmission = async (form,modal,_id,path,success_message,error_message,refresh) => {

  var data = CreateFormData(form);

  data._id = modal.parentElement.getAttribute(_id);

  const res = await axios.post(path,data);

  var feedback = await FeedbackToUser(res.data,success_message,error_message);

  if(refresh){

    if(feedback){
      await DelayedRefresh(1000);
    }

  }

  CollapseAllModals();

}

InitProspectMenus();
