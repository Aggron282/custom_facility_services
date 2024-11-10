var subscribe_form = document.querySelector("#subscribe");
var sub_btn = document.querySelector("#subhere");

async function SubscribeToCFS(){

  var form = new FormData(subscribe_form);
  var data = {};

  for (const [key, value] of form) {
    data[key] = value;
  }

  const res = await axios.post("/admin/subscribe",data);

  if(res.data){
    CreatePopup("Thank You for Subscribing!");
  }
  else{
    CreatePopup("Invalid");
  }

}

sub_btn.addEventListener("click",(e)=>{
  e.preventDefault();
  SubscribeToCFS();
})

subscribe_form.addEventListener("submit",(e)=>{
  e.preventDefault();
  SubscribeToCFS();
})
