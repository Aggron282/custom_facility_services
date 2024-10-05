var promises = [
  {
    title:"Clients are our Top Priority",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
  },
  {
    title:"We are Consistent & Transparent",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
  },
  {
    title:"Our Prices are Competitve",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
  },
  {
    title:"We Work Around your Schedule",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
  }
]


var counter = 0;
var promise_elements = document.getElementsByClassName("promise_box");
var title_element = document.querySelector("#current_title");
var description_element = document.querySelector("#current_description");
var number_element = document.querySelector("#current_number");
var manuallyChanged = false;

function SetPromise(element){

  var counter_data = parseInt(element.getAttribute("counter"));
  counter = counter_data;

  var current_promise = promises[counter];
  console.log(counter_data)
  console.log(current_promise);
  title_element.innerHTML = current_promise.title;
  description_element.innerHTML = current_promise.description;
  var num = 1 + parseInt(counter);

  number_element.innerHTML = "0"+num;

  SetActivePromise(element);

}

function FindElement(counter){
  for(var i =0; i < promise_elements.length; i++){
    if(parseInt(promise_elements[i].getAttribute("counter")) == counter){
      return promise_elements[i];
    }
  }
}

function SetActivePromise(element_){

  for(var i =0; i < promise_elements.length; i++){
    promise_elements[i].classList.remove("promise_box--active")
  }

  element_.classList.add("promise_box--active");

}

function AddEventsToPromises(){

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

AddEventsToPromises();

setInterval(()=>{
  if(!manuallyChanged){
    counter ++;
    if(counter > promises.length){
      counter = 0;
    }
    element_ = FindElement(counter);
    SetPromise(element_);
  }
},5000)

setInterval(()=>{
  manuallyChanged = false;
},5000);
