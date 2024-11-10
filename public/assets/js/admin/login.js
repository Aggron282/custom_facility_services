var login_form = document.querySelector("#loginform");
var login_btn = document.querySelector("#loginbtn");

async function Login(){

  var form = new FormData(login_form);
  var data = {};

  for (const [key, value] of form) {
    data[key] = value;
  }

  const res = await axios.post("/admin/subscribe",data);

  if(res.data){
    window.location.assign("/admin")
  }
  else{
    CreatePopup("Wrong Username / Password");
  }

}

login_btn.addEventListener("click",(e)=>{
  e.preventDefault();
  Login();
})

login_form.addEventListener("submit",(e)=>{
  e.preventDefault();
  Login();
})
