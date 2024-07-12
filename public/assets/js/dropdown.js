
function AddDropdownEvents(){

    var dropdowns = document.querySelectorAll(".dropdown_arrow");

    for(var arrow = 0; arrow <= dropdowns.length - 1; arrow++){

        dropdowns[arrow].addEventListener("click",function(e){
          resetDropdown(e,true);
        });

    }

}

function resetDropdown(e){

    var id = e.target.getAttribute("_id");

    var dropdowns = document.querySelectorAll(".dropdown-box");

    for(const dropdown of dropdowns){
      dropdown.classList.remove("active-dropdown");
    }

    for(const dropdown of dropdowns){

       if(dropdown.getAttribute("_id") == id){
         dropdown.classList.add("active-dropdown");
       }

    }

 }

function Init(){

  if(document.querySelector(".dropdown_arrow"){
    AddDropdownEvents();
  }

}

Init();
