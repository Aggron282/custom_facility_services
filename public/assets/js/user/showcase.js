
const SwitchImage  = (query,src_name) => {

  var img = document.getElementById(query);

  img.setAttribute("src",src_name);

}

const Init_Showcase = () => {

    var url = window.location.href;

    if(url == "/contact_us"){
      SwitchImage("mobile_showcase","./assets/images/contact_mobile.png");
    }
    else if(url == "/"){
      SwitchImage("mobile_showcase","./assets/images/showcase_landscape.png")
    }
    else if(url == "/schedule"){
      SwitchImage("mobile_showcase","./assets/images/quote_mobile.png");
    }
    else if(url == "/about_us"){
      SwitchImage("mobile_showcase","./assets/images/about_mobile.png");
    }

}

if(window.innerWidth <= 844){
  Init_Showcase();
}
