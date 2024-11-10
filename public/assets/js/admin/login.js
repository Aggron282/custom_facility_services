var login_form = document.querySelector("#loginform");
var login_btn = document.querySelector("#loginbtn");

const Login = async () => {

  var data = CreateFormData(login_form);

  const res = await axios.post("/auth/login",data);

  if(res.data){
    CreatePopup("Success!")
    DelayedRedirect(1000,"/admin");
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
