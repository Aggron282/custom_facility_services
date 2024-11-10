var width = window.innerWidth;

var navbar_element = document.querySelector(".navbar_container");
var nav_button = document.getElementById("button_navbar");

const NavClick = () => {

    var nav_container = document.getElementById("navbarToggleExternalContent");
    var toggle = "inactive";

    if(nav_container.getAttribute("status") == "inactive"){
      toggle = "active";
    }
    else{
      toggle = "inactive";
    }

    nav_container.setAttribute("status",toggle);

    if(nav_container.getAttribute("status") == "inactive"){
      nav_container.classList.add("active-navbar");
      nav_container.classList.remove("collapse");
    }
    else{
      nav_container.classList.add("collapse");
      nav_container.classList.remove("active-navbar");
    }

}

const Init_Navbar = () => {

  if(width > 690){

    navbar_element.innerHTML = desktop_nav;

    var contact = document.querySelector(".nav_col--contact");
    var schedule = document.querySelector(".nav_col--schedule");
    var about = document.querySelector(".nav_col--about");

    contact.addEventListener("click",()=>{
      window.location.assign("/contact_us");
    })

    about.addEventListener("click",()=>{
      window.location.assign("/about");
    })

    schedule.addEventListener("click",()=>{
      window.location.assign("/#hq");
    });

  }
  else{
    navbar_element.innerHTML = mobile_nav;
  }

  nav_button = document.getElementById("button_navbar");

  if(nav_button){

    nav_button.addEventListener("click",()=>{
      NavClick();
    });

  }

}

Init_Navbar();
