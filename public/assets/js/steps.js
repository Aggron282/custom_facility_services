var box = document.querySelector(".progress_clean_container--steps");
var title = document.querySelector(".progress_clean_text--title");
var list = document.querySelector(".progress_clean_list--steps");

var progress_container = document.querySelector(".progress_container");


var arrow_left = document.querySelector(".clean_arrow--left");
var arrow_right = document.querySelector(".clean_arrow--right");

var bubbles = document.getElementsByClassName("progress_clean_bubble");
var lines = document.getElementsByClassName("progress_clean_container--line");

var bullets_el = list.children;
var counter = 1;
var throttle = 1;
var isThrottle = true;


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ToggleBubbleClass(remove,i){

  if(remove){
    bubbles[i].classList.remove("progress_clean_bubble--active");
    lines[i].classList.remove("clean_line_active");
  }
  else{
    bubbles[i].classList.add("progress_clean_bubble--active");
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
     <p class="steps_title slidein">${counter}. ${steps_[counter].title} </p>

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
    counter = length + 1;
  }
  else if(counter > length + 1){
    counter = 1;
  }

  ToggleSteps();

}

function ToggleSteps(){

  var steps_box = document.querySelector(".progress_clean_container--steps");

  steps_box.innerHTML = GenerateSlide();

  GenerateBubbles();

}

ToggleSteps();
