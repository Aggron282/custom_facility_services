var box = document.querySelector(".steps_box");
var title = document.querySelector(".steps_title");
var list = document.querySelector(".steps_list");

var progress_container = document.querySelector(".progress_container");


var arrow_left = document.querySelector(".clean_arrow--left");
var arrow_right = document.querySelector(".clean_arrow--right");

var bubbles = document.getElementsByClassName("clean_bubble");
var lines = document.getElementsByClassName("what_we_clean_line");

var bullets_el = list.children;
var counter = 0;
var throttle = 1;
var isThrottle = true;


// if(window.innerWidth <= 680){
//   progress_container.innerHTML = "";
// }

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function ToggleBubbleClass(remove,i){
  if(remove){
    bubbles[i].classList.remove("clean_bubble_active");
    lines[i].classList.remove("clean_line_active");
  }else{
    bubbles[i].classList.add("clean_bubble_active");
    lines[i].classList.add("clean_line_active");
  }
}

function GenerateBubbles(){

  for(var i =0; i <bubbles.length; i++){

    if(i < lines.length){
      ToggleBubbleClass(true,i);
    }

  }

  for(var i =0; i < counter; i++){

    if(i < lines.length){
      ToggleBubbleClass(false,i);
    }

  }

}

function GenerateBullet(){

  var html = ``;

  for(var i = 0 ; i <  bullets_el.length;i++){
    html+= (`
    <li class="steps_list_ ">
       ${steps_[counter].bullets[i].description}
    </li>
    `);
  }

  return html;

}

 function GenerateSlide(){

  var html =
  `
     <p class="steps_title slidein">${counter + 1}. ${steps_[counter].title} </p>

     <ul class="steps_list_ slidein">
      ${GenerateBullet()}
     </ul>

    <div class="line_steps "></div>

    `

return html;

}


arrow_left.addEventListener("click", (event)=>{

  ChangeCounter(-1);

});

arrow_right.addEventListener("click", (event)=>{

  ChangeCounter(1);

});

function ChangeCounter(increment){

  counter += increment;
  var length = bullets_el.length;

  if(counter < 0){
    counter = length;
  }else if(counter > length){
    counter = 0;
  }

  ToggleSteps();

}

function ToggleSteps(){

  var steps_box = document.querySelector(".steps_box");

  steps_box.innerHTML = GenerateSlide();

  GenerateBubbles();

}

ToggleSteps();
