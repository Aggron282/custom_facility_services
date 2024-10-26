var quote_display_container = document.getElementsByClassName("quote_display_container");

for(var i =0; i < quote_display_container.length;i++){

    var choice_container_detail = quote_display_container[i].querySelector(".choice_container--details");

    choice_container_detail.addEventListener("click",(e)=>{

      var parent_ = e.target.parentElement.parentElement.parentElement;
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

    });

}

async function SubmitDetails(modal,form){

  var banner = document.querySelector(".updated_banner");

  banner.classList.add("updated_banner--updated")

//  ToggleModal(modal,0);

  const formData = new FormData(form);
  var data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }
  console.log(modal.parentElement)
  data._id = modal.parentElement.getAttribute("quote_id");
  console.log(data);
  var response = await axios.post("/admin/prospect/details/",data);

  setTimeout(()=>{
    banner.classList.remove("updated_banner--updated")
  },3000);

}

function ToggleModal(modal,index){

  modal.setAttribute("active",index);

  if(index >= 1 ){
    modal.classList.remove("quote_detail_modal--inactive");
    modal.classList.add("quote_detail_modal--active");
  }
  else{
    modal.classList.add("quote_detail_modal--inactive");
    modal.classList.remove("quote_detail_modal--active");
  }

}
