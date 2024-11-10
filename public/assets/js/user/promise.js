var counter = 0;
var promise_elements = document.getElementsByClassName("promise_box");
var title_element = document.querySelector("#current_title");
var description_element = document.querySelector("#current_description");
var number_element = document.querySelector("#current_number");
var manuallyChanged = false;
var time_to_change = 5000;

const SetPromise = (element) => {

  var counter_data = parseInt(element.getAttribute("counter"));

  counter = counter_data;

  var current_promise = promises[counter];

  title_element.innerHTML = current_promise.title;
  description_element.innerHTML = current_promise.description;

  var num = 1 + parseInt(counter);

  number_element.innerHTML = "0"+num;

  SetActivePromise(element);

}

const FindElement = (counter) => {

  for(var i =0; i < promise_elements.length; i++){

    if(parseInt(promise_elements[i].getAttribute("counter")) == counter){
      return promise_elements[i];
    }

  }

}

const SetActivePromise = (element_) => {

  for(var i =0; i < promise_elements.length; i++){
    promise_elements[i].classList.remove("promise_box--active")
  }

  element_.classList.add("promise_box--active");

}

const AddEventsToPromises = () => {

    for(var i =0; i < promise_elements.length; i++){

      var element_ = promise_elements[i];

      if(!element_){
        return;
      }

      element_.addEventListener("click",(e)=>{

        var target= e.target;

        manuallyChanged = true;

        if(!target.classList.contains("promise_box")){
            target = target.parentElement;
        }

        SetPromise(target);

      });

    }

}

const Init_Promise  = () => {

  AddEventsToPromises();

  if(promise_elements.length > 0){

    setInterval(()=>{

      if(!manuallyChanged){

        counter ++;

        if(counter > promises.length){
          counter = 0;
        }

        element_ = FindElement(counter);

        SetPromise(element_);

      }

    },time_to_change)

    setInterval(()=>{
      manuallyChanged = false;
    },time_to_change);

  }

}

Init_Promise();
