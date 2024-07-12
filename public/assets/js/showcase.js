
function switch_image(query,src_name){
  var img = document.getElementById(query);
  img.setAttribute("src",src_name);
}

function Init(){

    var url = window.location.href;

    if(url == "/contact_us"){
      switch_image("mobile_showcase","./assets/images/contact_mobile.png");
    }else if(url == "/"){
      switch_image("mobile_showcase","./assets/images/showcase_landscape.png")
    }
    else if(url == "/schedule"){
      switch_image("mobile_showcase","./assets/images/quote_mobile.png");
    }
    else if(url == "/about_us"){
      switch_image("mobile_showcase","./assets/images/about_mobile.png");
    }

}

if(window.innerWidth <= 844){
  Init();
}
