var button_2 = document.querySelector(".our_client_button--2");
var button_1 = document.querySelector(".our_client_button--1");
var button_3 = document.querySelector(".our_client_button--3");

var buttons = document.getElementsByClassName("our_client_button");

var left_col = document.querySelector(".our_clients_col--left");
var right_col = document.querySelector(".our_clients_col--right")
var main_col = document.querySelector(".our_clients_col--main");

var cols = [left_col,main_col,right_col];

var counter = 0;

var slides = ["left_","main_","right_"];



function button_handler(e,counter_){

  var new_arr = move_array(counter,counter_);
  RemoveActiveButtonClass();
  e.target.classList.add("our_client_active_buttton");
  Carousel(new_arr,counter_);

}

function move_array(current,next){

    var slides_ = [...slides];
    var current_ = parseInt(current);
    var next = parseInt(next);
    var diff =  next - current;

    for(var i = 0; i < slides.length ; i++){

     var new_index_ = i - diff;

      if(new_index_ < 0){
        slides_[slides.length + new_index_] = slides[i];
      }else{
        slides_[new_index_] = slides[i];
      }

    }

    return slides_

}

const RemoveActiveButtonClass =()=>{

  for(var i = 0; i< buttons.length;i++){
    buttons[i].classList.remove("our_client_active_buttton")
  }

}


const AddButtonEvents = () =>{

  for(var i =0; i < buttons.length;i++){

    buttons[i].addEventListener("click",(e)=>{
      var num = e.target.getAttribute("button_num");
      button_handler(e,num)
    });

  }

}


const Carousel = (new_arr,counter) => {

  for(var i =0; i < cols.length; i++){

    for(var k = 0; k < slides.length;k++){
      cols[i].classList.remove("our_clients_col--"+slides[k]);
    }

  }

  for(var i = 0; i <cols.length; i++){
    cols[i].classList.add("our_clients_col--"+new_arr[i]);
  }

}


AddButtonEvents();
