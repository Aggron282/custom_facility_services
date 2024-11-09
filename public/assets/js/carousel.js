var increment = 105;
var start  = -85;
var images = ["11","pj","12","10"];
var count = images.length - 1;
var carol_count = 1;
var hasChanged = false;
var slideshow_container = document.querySelector(".slideshow_container");
var arrows_in_slideshow = document.getElementsByClassName("arrow_container");
var g_multi = 1;

for(var i = 0; i < arrows_in_slideshow.length; i++){

    arrows_in_slideshow[i].addEventListener("click",(e)=>{

      var multi = e.target.getAttribute("multiplier");

      multi = parseInt(multi);

      hasChanged = true;

      MoveBoxes(multi);

    })

}

function MoveBoxes(multiplier){

  var boxes = document.getElementsByClassName("client_slideshow_container--box");
  var reachedLimit = false;

  carol_count += Math.abs(1) * multiplier;

  if(carol_count < 0){
    carol_count = 0;
    g_multi = 1;
    reachedLimit = true;
  }

  if(carol_count >= count ){
    carol_count = count - 1;
    reachedLimit = true;
    g_multi = -1;
  }

  if(reachedLimit){
    return;
  }

  for(var i = 0; i < boxes.length; i++){

    var left = parseInt(boxes[i].getAttribute("pos"));
    var incr = Math.abs(increment) * multiplier;
    var new_left = left - incr;

    var translate = `translateX(${new_left}%)`;

    boxes[i].style.transform = translate;
    boxes[i].setAttribute("pos",new_left)

  }

}

var RenderCarousel  = () =>{

  var html =  "";
  var left = start;

  for(var i = 0; i < count; i++){

    var b = i;

    if(b <= 0){
      b =1
    }

    if( b >= count){
      b = count;
    }

    var transform = `"transform: translateX(${left}%)"`;

    html +=( `

      <div class = "client_slideshow_container--box slideshow_box--${b}" style = ${transform} pos = "${left}">
          <img class="client_slideshow_img" src = "/assets/images/values/${images[i]}.png"/>
      </div>
    `);

    left += increment;

  }

  slideshow_container.innerHTML  = html;

}


setInterval(()=>{

  if(hasChanged){
    hasChanged = false;
  }

},5000);

setInterval(()=>{

  if(!hasChanged){
    MoveBoxes(g_multi);
  }

},4000);

RenderCarousel();
