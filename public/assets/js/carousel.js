var increment = 105;
var start  = -85;
var images = ["11","pj","12","10"];
var count = images.length;
var counter = 0;

var slideshow_container = document.querySelector(".slideshow_container");
var arrows_in_slideshow = document.getElementsByClassName("arrow_container");

for(var i = 0; i < arrows_in_slideshow.length; i++){
    arrows_in_slideshow[i].addEventListener("click",(e)=>{
      var multi = e.target.getAttribute("multiplier");
      multi = parseInt(multi);
      MoveBoxes(multi);
    })
}

function MoveBoxes(multiplier){

  var boxes = document.getElementsByClassName("client_slideshow_container--box");
  var reachedLimit = false;
  if(counter <= 0){
    counter = 0;
    reachedLimit = true;
  }
  if(counter >= count){
    counter = count;
    reachedLimit = true;
  }

  counter += Math.abs(1) * multiplier;
  if(reachedLimit){
    return;
  }
  for(var i = 0; i < boxes.length; i++){
    var left = parseInt(boxes[i].getAttribute("pos"));
    var incr = Math.abs(increment) * multiplier;
    var new_left = left + incr;

    var translate = `translateX(${new_left}%)`;
    boxes[i].style.transform = translate;
    boxes[i].setAttribute("pos",new_left)

  }

}



var RenderCarousel  = () =>{
  var html =  "";
  var left = start;
  for(var i = 0; i < count; i++){
    var transform = `"transform: translateX(${left}%)"`;
    html +=( `

      <div class = "client_slideshow_container--box slideshow_box--${i+1}" style = ${transform} pos = "${left}">
          <img class="client_slideshow_img" src = "/assets/images/values/${images[i]}.png"/>
      </div>
    `);

    left += increment;

  }

    slideshow_container.innerHTML  = html;

  }


RenderCarousel();
